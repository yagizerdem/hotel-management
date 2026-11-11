import type { ZodError } from "zod";
import HttpStatusCode from "@lib/http-status-code";
import { MachineCode } from "@lib/machine-code";
import type { TServerEndpoint } from "@type/server-endpoint";

/** First error message for each invalid field, keyed by field name. */
export interface FieldErrors {
  [key: string]: string;
}

interface AppErrorOptions {
  fieldErrors?: FieldErrors;
  cause?: unknown;
  endpointType?: TServerEndpoint;
  machineCode?: MachineCode;
}

/** Plain-object form of an AppError, safe to return from a server action. */
export interface SerializedAppError {
  message: string;
  statusCode?: HttpStatusCode;
  fieldErrors?: FieldErrors;
  machineCode?: MachineCode;
}

const INTERNAL_MESSAGE = "Something went wrong. Try again in a moment.";

// Keeps a machine code the caller passed, or falls back to the general code
// for the status.
function withMachineCode(
  options: AppErrorOptions | undefined,
  machineCode: MachineCode,
): AppErrorOptions {
  return { ...options, machineCode: options?.machineCode ?? machineCode };
}

/**
 * An error whose message is written for the person using the app, so it can
 * be shown as is. Anything else is reported as an internal error, and its
 * details stay on the server.
 *
 * The status code says what kind of failure it is. It only goes out over
 * HTTP: a server action answers through React, so its serialized error has
 * no status code.
 *
 * The machine code says why it failed in a form code can check, for example
 * EMAIL_IN_USE. Each factory below sets the general code for its status
 * unless the options name a more specific one.
 *
 * isOperational tells expected failures (bad input, a booked room night, the
 * database being down) from bugs. Operational errors are part of normal use;
 * a non-operational one is an unexpected throw that should be logged with its
 * cause and looked into.
 */
export class AppError extends Error {
  readonly statusCode: HttpStatusCode;
  readonly isOperational: boolean;
  readonly fieldErrors?: FieldErrors;
  readonly endpointType?: TServerEndpoint;
  readonly machineCode?: MachineCode;

  constructor(
    message: string,
    statusCode: HttpStatusCode,
    isOperational = true,
    options: AppErrorOptions = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.fieldErrors = options.fieldErrors;
    this.endpointType = options.endpointType;
    this.machineCode = options.machineCode;
  }

  /**
   * Builds an error from the constructor arguments, with any status code.
   * Prefer the named factories below, which match the ApiResponse helpers
   * one to one.
   */
  static from({
    message,
    statusCode,
    isOperational = true,
    options = {},
  }: {
    message: string;
    statusCode: HttpStatusCode;
    isOperational?: boolean;
    options?: AppErrorOptions;
  }): AppError {
    return new AppError(message, statusCode, isOperational, options);
  }

  /** 400: the input is malformed or fails validation. */
  static badRequest(message: string, options?: AppErrorOptions) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.BAD_REQUEST,
      options: withMachineCode(options, MachineCode.BAD_REQUEST),
    });
  }

  /** 401: nobody is signed in, or the session has expired. */
  static unauthorized(
    message = "Sign in to continue.",
    options?: AppErrorOptions,
  ) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.UNAUTHORIZED,
      options: withMachineCode(options, MachineCode.UNAUTHORIZED),
    });
  }

  /** 403: the person is signed in but their role doesn't allow this. */
  static forbidden(
    message = "You don't have access to this.",
    options?: AppErrorOptions,
  ) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.FORBIDDEN,
      options: withMachineCode(options, MachineCode.FORBIDDEN),
    });
  }

  /** 404: the record doesn't exist. */
  static notFound(message: string, options?: AppErrorOptions) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.NOT_FOUND,
      options: withMachineCode(options, MachineCode.NOT_FOUND),
    });
  }

  /**
   * 409: the request clashes with the current data, for example a room night
   * that is already booked.
   */
  static conflict(message: string, options?: AppErrorOptions) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.CONFLICT,
      options: withMachineCode(options, MachineCode.CONFLICT),
    });
  }

  /**
   * 422: the input is well formed but breaks a business rule, for example a
   * check-out date before the check-in date.
   */
  static unprocessableEntity(message: string, options?: AppErrorOptions) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      options: withMachineCode(options, MachineCode.UNPROCESSABLE_ENTITY),
    });
  }

  /** 429: too many requests in a short time. */
  static tooManyRequests(
    message = "Too many requests. Try again in a moment.",
    options?: AppErrorOptions,
  ) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
      options: withMachineCode(options, MachineCode.TOO_MANY_REQUESTS),
    });
  }

  /** 500: something failed on the server. Pass the original error as cause. */
  static internalServerError(
    message = INTERNAL_MESSAGE,
    options?: AppErrorOptions,
  ) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      options: withMachineCode(options, MachineCode.INTERNAL_SERVER_ERROR),
    });
  }

  /** 503: a service the request depends on is down, for example the database. */
  static serviceUnavailable(
    message = "The service is unavailable. Try again later.",
    options?: AppErrorOptions,
  ) {
    return AppError.from({
      message,
      statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
      options: withMachineCode(options, MachineCode.SERVICE_UNAVAILABLE),
    });
  }

  /**
   * Turns failed Zod parsing into a validation error, keeping the first
   * message for each field like the forms do.
   */
  static fromZod(error: ZodError, message = "Failed validation.") {
    const fieldErrors: FieldErrors = {};
    for (const issue of error.issues) {
      const field = issue.path[0];
      if (field === undefined) continue;
      fieldErrors[String(field)] ??= issue.message;
    }
    return AppError.badRequest(message, {
      fieldErrors,
      cause: error,
      machineCode: MachineCode.VALIDATION_FAILED,
    });
  }

  /**
   * Wraps any thrown value. AppErrors pass through and everything else
   * becomes an internal error, with the original kept as its cause.
   * Pass the endpoint where the error is caught, so it serializes correctly.
   */
  static fromUnknown({
    error,
    endpoint,
  }: {
    error: unknown;
    endpoint?: TServerEndpoint;
  }): AppError {
    // Anything that isn't an AppError was not expected, so it isn't operational.
    const appError =
      error instanceof AppError
        ? error
        : AppError.from({
            message: INTERNAL_MESSAGE,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            isOperational: false,
            options: {
              cause: error,
              machineCode: MachineCode.INTERNAL_SERVER_ERROR,
            },
          });

    return endpoint ? appError.withEndpoint(endpoint) : appError;
  }

  /** A copy of this error marked as coming from the given endpoint. */
  withEndpoint(endpoint: TServerEndpoint): AppError {
    if (this.endpointType === endpoint) return this;
    return new AppError(this.message, this.statusCode, this.isOperational, {
      fieldErrors: this.fieldErrors,
      cause: this.cause,
      endpointType: endpoint,
      machineCode: this.machineCode,
    });
  }

  toJSON(): SerializedAppError {
    return {
      message: this.message,
      ...(this.endpointType !== "server-action" && {
        statusCode: this.statusCode,
      }),
      ...(this.fieldErrors && { fieldErrors: this.fieldErrors }),
      ...(this.machineCode && { machineCode: this.machineCode }),
    };
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
