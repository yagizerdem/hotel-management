import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@util/api-response.js";
import { AppError } from "@util/app-error.js";
import HttpStatusCode from "@util/http-status-codes.js";

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(
    new AppError({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "Route not found",
    }),
  );
}

// Express 4-argument signature identifies this as the error middleware.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError && err.isOperational) {
    res.status(err.httpStatusCode).json(
      ApiResponse.from({
        data: {
          formErrors: err.formErrors,
          errors: err.errors,
          path: err.path,
        },
        message: err.message,
        httpStatusCode: err.httpStatusCode,
      }),
    );
    return;
  }

  // Client errors raised by Express/body-parser (e.g. malformed JSON).
  const status = (err as { status?: unknown } | null)?.status;
  if (typeof status === "number" && status >= 400 && status < 500) {
    res.status(status).json(
      ApiResponse.from({
        data: null,
        message: "Invalid request",
        httpStatusCode: status as HttpStatusCode,
      }),
    );
    return;
  }

  console.error(err);
  res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json(ApiResponse.internalServerError());
}
