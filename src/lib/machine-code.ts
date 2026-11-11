/**
 * Stable codes that say why a request failed, for code to branch on.
 * `message` and `error` are written for people and may change; these don't,
 * so a client can check `machineCode === MachineCode.EMAIL_IN_USE` instead
 * of matching text.
 *
 * The values are strings so they read clearly in a response body and don't
 * shift when a code is added. Never rename or reuse a value once clients
 * depend on it.
 */
export enum MachineCode {
  // One general code per status, used when nothing more specific applies.
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // Input
  VALIDATION_FAILED = "VALIDATION_FAILED",
  INVALID_ID = "INVALID_ID",
  INVALID_QUERY_PARAM = "INVALID_QUERY_PARAM",

  // Auth and accounts
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  EMAIL_IN_USE = "EMAIL_IN_USE",

  // Database
  RECORD_NOT_FOUND = "RECORD_NOT_FOUND",
  DUPLICATE_KEY = "DUPLICATE_KEY",
  VERSION_CONFLICT = "VERSION_CONFLICT",
  WRITE_CONFLICT = "WRITE_CONFLICT",
  QUERY_TIMEOUT = "QUERY_TIMEOUT",
}
