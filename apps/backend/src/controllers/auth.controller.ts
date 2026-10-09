import { ApiResponse } from "@/util/api-response.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import { getClientRegisterValidator } from "@validator/register.validator.js";
import type { Request, Response } from "express";
import { z } from "zod";

export async function register(req: Request, res: Response) {
  const registerValidator = getClientRegisterValidator();

  const userData = await registerValidator.safeParseAsync(req.body);

  if (!userData.success) {
    const otherErrors: string[] = z.flattenError(userData.error).formErrors;
    const fieldErrors: Record<string, string[]> = z.flattenError(
      userData.error,
    ).fieldErrors;

    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "register failed",
      formErrors: fieldErrors,
      errors: otherErrors,
      path: "/api/auth/register",
    });
  }

  res.status(HttpStatusCode.CREATED).send(ApiResponse.created(userData));
}
