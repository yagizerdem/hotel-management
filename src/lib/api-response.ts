import { TServerEndpoint } from "@type/server-endpoint";
import HttpStatusCode from "@lib/http-status-code";
import type { AppError, FieldErrors } from "@error/app-error";

/** What a server action returns when it works. */
export type ActionSuccess<T> = {
  success: true;
  data?: T;
  message?: string;
  endpoint: "server-action";
};

/** What a server action returns when it fails. */
export type ActionFailure = {
  success: false;
  data?: never;
  message?: string;
  error?: string;
  fieldErrors?: FieldErrors;
  endpoint: "server-action";
};

/**
 * Either result of a server action. Checking `success` narrows it, so after
 * `if (response.success)` the data has the action's type.
 */
export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

/**
 * Response body shared by route handlers and server actions. Build it through
 * the static constructors, which keep the status code rules in one place:
 * route handlers answer over HTTP and always carry a status code, while server
 * actions answer through React and never do.
 *
 * `message` is an optional sentence for the person using the app, such as
 * "Your reservation is confirmed." `error` says what went wrong on a failure.
 */
export class ApiResponse<T> {
  private constructor(
    public success: boolean,
    public data?: T,
    public message?: string,
    public error?: string,
    public fieldErrors?: FieldErrors,
    public httpStatusCode?: number,
    public endpoint?: TServerEndpoint,
  ) {}

  // React can't pass class instances from a server action to the client, so
  // the action constructors return a plain copy.

  static actionSuccess<T>(message?: string, data?: T): ActionSuccess<T> {
    return {
      ...new ApiResponse<T>(
        true,
        data,
        message,
        undefined,
        undefined,
        undefined,
        "server-action",
      ),
      success: true,
      endpoint: "server-action",
    };
  }

  static actionFailure(
    message?: string,
    error?: string,
    fieldErrors?: FieldErrors,
  ): ActionFailure {
    return {
      ...new ApiResponse<never>(
        false,
        undefined,
        message,
        error,
        fieldErrors,
        undefined,
        "server-action",
      ),
      success: false,
      endpoint: "server-action",
    };
  }

  /** A server action failure built from an AppError, keeping its field errors. */
  static actionFromError(error: AppError, message?: string): ActionFailure {
    return ApiResponse.actionFailure(
      message,
      error.message,
      error.fieldErrors,
    );
  }

  // Route handler constructors, one per status code.

  /** 200: the request worked and the body holds the result. */
  static ok<T>(data?: T, message?: string) {
    return ApiResponse.routeSuccess(data, message, HttpStatusCode.OK);
  }

  /** 201: a new record was created, for example a reservation. */
  static created<T>(data?: T, message?: string) {
    return ApiResponse.routeSuccess(data, message, HttpStatusCode.CREATED);
  }

  /**
   * 202: the request was taken but finishes later, for example a report
   * queued for the governorship's web service.
   */
  static accepted<T>(data?: T, message?: string) {
    return ApiResponse.routeSuccess(data, message, HttpStatusCode.ACCEPTED);
  }

  /** 400: the request is malformed, for example invalid JSON or a missing field. */
  static badRequest<T = never>(
    error: string,
    message?: string,
    fieldErrors?: FieldErrors,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.BAD_REQUEST,
      fieldErrors,
    );
  }

  /** 401: nobody is signed in, or the session has expired. */
  static unauthorized<T = never>(
    error = "Sign in to continue.",
    message?: string,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  /** 403: the person is signed in but their role doesn't allow this. */
  static forbidden<T = never>(
    error = "You don't have access to this.",
    message?: string,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.FORBIDDEN,
    );
  }

  /** 404: the record doesn't exist. */
  static notFound<T = never>(error: string, message?: string) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.NOT_FOUND,
    );
  }

  /**
   * 409: the request clashes with the current data, for example a room night
   * that is already booked.
   */
  static conflict<T = never>(
    error: string,
    message?: string,
    fieldErrors?: FieldErrors,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.CONFLICT,
      fieldErrors,
    );
  }

  /**
   * 422: the request is well formed but breaks a business rule, for example a
   * check-out date before the check-in date.
   */
  static unprocessableEntity<T = never>(
    error: string,
    message?: string,
    fieldErrors?: FieldErrors,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      fieldErrors,
    );
  }

  /** 429: too many requests in a short time. */
  static tooManyRequests<T = never>(
    error = "Too many requests. Try again in a moment.",
    message?: string,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.TOO_MANY_REQUESTS,
    );
  }

  /** 500: something failed on the server. */
  static internalServerError<T = never>(
    error = "Something went wrong. Try again in a moment.",
    message?: string,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }

  /** 503: a service the request depends on is down, for example the database. */
  static serviceUnavailable<T = never>(
    error = "The service is unavailable. Try again later.",
    message?: string,
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      message,
      HttpStatusCode.SERVICE_UNAVAILABLE,
    );
  }

  /**
   * A failure built from an AppError, keeping its message, status code and
   * field errors.
   */
  static fromError<T = never>(error: AppError, message?: string) {
    return ApiResponse.routeFailure<T>(
      error.message,
      message,
      error.statusCode,
      error.fieldErrors,
    );
  }

  private static routeSuccess<T>(
    data: T | undefined,
    message: string | undefined,
    status: HttpStatusCode,
  ) {
    return new ApiResponse<T>(
      true,
      data,
      message,
      undefined,
      undefined,
      status,
      "route-handler",
    );
  }

  private static routeFailure<T>(
    error: string,
    message: string | undefined,
    status: HttpStatusCode,
    fieldErrors?: FieldErrors,
  ) {
    return new ApiResponse<T>(
      false,
      undefined,
      message,
      error,
      fieldErrors,
      status,
      "route-handler",
    );
  }
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  fieldErrors?: FieldErrors;
  status: HttpStatusCode;
  source: string;
}
