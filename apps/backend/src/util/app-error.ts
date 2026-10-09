import type HttpStatusCode from "@util/http-status-codes.js";

export type FormErrors = Record<string, string[]>;

export interface AppErrorOptions {
  httpStatusCode: HttpStatusCode;
  message: string;
  formErrors?: FormErrors;
  errors?: string[];
  path?: string;
  isOperational?: boolean;
  cause?: unknown;
}

export class AppError extends Error {
  public readonly httpStatusCode: HttpStatusCode;
  public readonly formErrors: FormErrors;
  public readonly errors: string[];
  public readonly path?: string;
  public readonly isOperational: boolean;

  constructor({
    httpStatusCode,
    message,
    formErrors = {},
    errors = [],
    path,
    isOperational = true,
    cause,
  }: AppErrorOptions) {
    super(message, { cause });
    this.name = "AppError";
    this.httpStatusCode = httpStatusCode;
    this.formErrors = formErrors;
    this.errors = errors;
    this.path = path;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, AppError);
  }

  static from(options: AppErrorOptions): AppError {
    return new AppError(options);
  }
}
