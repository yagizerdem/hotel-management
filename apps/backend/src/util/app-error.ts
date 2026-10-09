import type HttpStatusCode from "@util/http-status-codes.js";

export type FormErrors = Record<string, string[]>;

export interface AppErrorOptions {
  httpStatusCode: HttpStatusCode;
  message: string;
  formErrors?: FormErrors;
  isOperational?: boolean;
  cause?: unknown;
}

export class AppError extends Error {
  public readonly httpStatusCode: HttpStatusCode;
  public readonly formErrors: FormErrors;
  public readonly isOperational: boolean;

  constructor({
    httpStatusCode,
    message,
    formErrors = {},
    isOperational = true,
    cause,
  }: AppErrorOptions) {
    super(message, { cause });
    this.name = "AppError";
    this.httpStatusCode = httpStatusCode;
    this.formErrors = formErrors;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, AppError);
  }

  static from(options: AppErrorOptions): AppError {
    return new AppError(options);
  }
}
