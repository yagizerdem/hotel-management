import { TServerEndpoint } from "@type/server-endpoint";
import HttpStatusCode from "@lib/http-status-code";
import type { AppError } from "@error/app-error";

/**
 * Response body shared by route handlers and server actions. Build it through
 * the static constructors, which keep the status code rules in one place:
 * route handlers answer over HTTP and always carry a status code, while server
 * actions answer through React and never do.
 */
export class ApiResponse<T> {
  private constructor(
    public success: boolean,
    public data?: T,
    public error?: string,
    public httpStatusCode?: number,
    public endpoint?: TServerEndpoint,
  ) {}

  // React can't pass class instances from a server action to the client, so
  // the action constructors return a plain copy.

  static actionSuccess<T>(data?: T) {
    return {
      ...new ApiResponse<T>(true, data, undefined, undefined, "server-action"),
    };
  }

  static actionFailure<T = never>(error: string) {
    return {
      ...new ApiResponse<T>(
        false,
        undefined,
        error,
        undefined,
        "server-action",
      ),
    };
  }

  // Route handler constructors, one per status code.

  /** 200: the request worked and the body holds the result. */
  static ok<T>(data?: T) {
    return ApiResponse.routeSuccess(data, HttpStatusCode.OK);
  }

  /** 201: a new record was created, for example a reservation. */
  static created<T>(data?: T) {
    return ApiResponse.routeSuccess(data, HttpStatusCode.CREATED);
  }

  /**
   * 202: the request was taken but finishes later, for example a report
   * queued for the governorship's web service.
   */
  static accepted<T>(data?: T) {
    return ApiResponse.routeSuccess(data, HttpStatusCode.ACCEPTED);
  }

  /** 400: the request is malformed, for example invalid JSON or a missing field. */
  static badRequest<T = never>(error: string) {
    return ApiResponse.routeFailure<T>(error, HttpStatusCode.BAD_REQUEST);
  }

  /** 401: nobody is signed in, or the session has expired. */
  static unauthorized<T = never>(error = "Sign in to continue.") {
    return ApiResponse.routeFailure<T>(error, HttpStatusCode.UNAUTHORIZED);
  }

  /** 403: the person is signed in but their role doesn't allow this. */
  static forbidden<T = never>(error = "You don't have access to this.") {
    return ApiResponse.routeFailure<T>(error, HttpStatusCode.FORBIDDEN);
  }

  /** 404: the record doesn't exist. */
  static notFound<T = never>(error: string) {
    return ApiResponse.routeFailure<T>(error, HttpStatusCode.NOT_FOUND);
  }

  /**
   * 409: the request clashes with the current data, for example a room night
   * that is already booked.
   */
  static conflict<T = never>(error: string) {
    return ApiResponse.routeFailure<T>(error, HttpStatusCode.CONFLICT);
  }

  /**
   * 422: the request is well formed but breaks a business rule, for example a
   * check-out date before the check-in date.
   */
  static unprocessableEntity<T = never>(error: string) {
    return ApiResponse.routeFailure<T>(
      error,
      HttpStatusCode.UNPROCESSABLE_ENTITY,
    );
  }

  /** 429: too many requests in a short time. */
  static tooManyRequests<T = never>(
    error = "Too many requests. Try again in a moment.",
  ) {
    return ApiResponse.routeFailure<T>(error, HttpStatusCode.TOO_MANY_REQUESTS);
  }

  /** 500: something failed on the server. */
  static internalServerError<T = never>(
    error = "Something went wrong. Try again in a moment.",
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }

  /** 503: a service the request depends on is down, for example the database. */
  static serviceUnavailable<T = never>(
    error = "The service is unavailable. Try again later.",
  ) {
    return ApiResponse.routeFailure<T>(
      error,
      HttpStatusCode.SERVICE_UNAVAILABLE,
    );
  }

  /** A failure built from an AppError, keeping its message and status code. */
  static fromError<T = never>(error: AppError) {
    return ApiResponse.routeFailure<T>(error.message, error.statusCode);
  }

  private static routeSuccess<T>(data: T | undefined, status: HttpStatusCode) {
    return new ApiResponse<T>(true, data, undefined, status, "route-handler");
  }

  private static routeFailure<T>(error: string, status: HttpStatusCode) {
    return new ApiResponse<T>(false, undefined, error, status, "route-handler");
  }
}
