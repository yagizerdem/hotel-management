import type HttpStatusCode from "@util/http-status-codes.js";

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
}
