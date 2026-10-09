import { z } from "zod";
import { AppError } from "@util/app-error.js";
import HttpStatusCode from "@util/http-status-codes.js";

export function parseOrThrow<T>(
  result: z.ZodSafeParseResult<T>,
  message: string,
  path: string,
): T {
  if (result.success) return result.data;

  const { formErrors, fieldErrors } = z.flattenError(result.error);
  throw AppError.from({
    httpStatusCode: HttpStatusCode.BAD_REQUEST,
    message,
    formErrors: fieldErrors as Record<string, string[]>,
    errors: formErrors,
    path,
  });
}
