import HttpStatusCode from "@util/http-status-codes.js";

export interface ApiResponseInit<T> {
  data: T;
  message: string;
  httpStatusCode: HttpStatusCode;
}

export class ApiResponse<T> {
  public data: T;
  public message: string;
  public httpStatusCode: HttpStatusCode;
  public timestamp: Date;
  public success: boolean;

  constructor(data: T, message: string, httpStatusCode: HttpStatusCode) {
    this.data = data;
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date();
    this.success = httpStatusCode >= 200 && httpStatusCode < 300;
  }

  static from<T>({ data, message, httpStatusCode }: ApiResponseInit<T>) {
    return new ApiResponse(data, message, httpStatusCode);
  }

  static ok<T>(data: T, message = "OK") {
    return ApiResponse.from({ data, message, httpStatusCode: HttpStatusCode.OK });
  }

  static created<T>(data: T, message = "Created") {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.CREATED,
    });
  }

  static noContent(message = "No Content") {
    return ApiResponse.from({
      data: null,
      message,
      httpStatusCode: HttpStatusCode.NO_CONTENT,
    });
  }

  static badRequest<T = null>(message = "Bad Request", data: T = null as T) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
    });
  }

  static unauthorized<T = null>(message = "Unauthorized", data: T = null as T) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }

  static forbidden<T = null>(message = "Forbidden", data: T = null as T) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.FORBIDDEN,
    });
  }

  static notFound<T = null>(message = "Not Found", data: T = null as T) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.NOT_FOUND,
    });
  }

  static conflict<T = null>(message = "Conflict", data: T = null as T) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.CONFLICT,
    });
  }

  static unprocessableEntity<T = null>(
    message = "Unprocessable Entity",
    data: T = null as T,
  ) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
    });
  }

  static internalServerError<T = null>(
    message = "Internal Server Error",
    data: T = null as T,
  ) {
    return ApiResponse.from({
      data,
      message,
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}
