import { Error as MongooseError, mongo } from "mongoose";
import { AppError, type FieldErrors } from "@error/app-error";
import type { TServerEndpoint } from "@type/server-endpoint";

/**
 * Server error codes that come from what the person did, so they can be
 * shown to them.
 * @see {@link https://www.mongodb.com/docs/manual/reference/error-codes/}
 */
const MONGO_ERROR_CODES = {
  MaxTimeMSExpired: 50,
  WriteConflict: 112,
  DocumentValidationFailure: 121,
  ExceededTimeLimit: 262,
  DuplicateKey: 11000,
} as const;

/** True for errors from the MongoDB driver or the server. */
export function isMongoError(error: unknown): error is mongo.MongoError {
  return error instanceof mongo.MongoError;
}

/** True for errors raised by Mongoose itself, such as failed validation. */
export function isMongooseError(error: unknown): error is MongooseError {
  return error instanceof MongooseError;
}

/**
 * Turns a MongoDB or Mongoose error into an AppError. Operational errors,
 * the ones caused by the request such as a duplicate email, keep a message
 * the person can act on. Anything else becomes an internal server error
 * with the original kept as its cause.
 *
 * Pass the endpoint the error is answered through, so the AppError
 * serializes correctly for a route handler or a server action.
 */
export function handleMongoError(
  error: unknown,
  endpoint: TServerEndpoint,
): AppError {
  const options = { cause: error, endpointType: endpoint };

  if (error instanceof MongooseError.ValidationError) {
    return AppError.badRequest("Check the highlighted fields.", {
      ...options,
      fieldErrors: validationFieldErrors(error),
    });
  }
  if (error instanceof MongooseError.CastError) {
    return AppError.badRequest(`The ${error.path} is not valid.`, options);
  }
  if (error instanceof MongooseError.DocumentNotFoundError) {
    return AppError.notFound("This record no longer exists.", options);
  }
  if (error instanceof MongooseError.VersionError) {
    return AppError.conflict(
      "This record was changed by someone else. Reload it and try again.",
      options,
    );
  }

  const code = error instanceof mongo.MongoServerError ? error.code : undefined;

  switch (code) {
    case MONGO_ERROR_CODES.DuplicateKey: {
      const field = duplicateField(error as mongo.MongoServerError);
      return field
        ? AppError.conflict(`This ${field} is already in use.`, {
            ...options,
            fieldErrors: { [field]: `This ${field} is already in use.` },
          })
        : AppError.conflict("This record already exists.", options);
    }
    case MONGO_ERROR_CODES.DocumentValidationFailure:
      return AppError.badRequest(
        "Some of the details aren't valid. Check them and try again.",
        options,
      );
    case MONGO_ERROR_CODES.WriteConflict:
      return AppError.conflict(
        "Someone else changed this at the same time. Try again.",
        options,
      );
    case MONGO_ERROR_CODES.MaxTimeMSExpired:
    case MONGO_ERROR_CODES.ExceededTimeLimit:
      return AppError.serviceUnavailable(
        "This took too long. Try again in a moment.",
        options,
      );
    default:
      return AppError.internalServerError(undefined, options);
  }
}

function validationFieldErrors(error: MongooseError.ValidationError) {
  const fieldErrors: FieldErrors = {};
  for (const [path, issue] of Object.entries(error.errors)) {
    fieldErrors[path] = issue.message;
  }
  return fieldErrors;
}

// A duplicate key error names the clashing fields in keyValue. Only a
// single-field index, such as a unique email, points to one field.
function duplicateField(error: mongo.MongoServerError) {
  const fields = Object.keys(error.keyValue ?? {});
  return fields.length === 1 ? fields[0] : undefined;
}
