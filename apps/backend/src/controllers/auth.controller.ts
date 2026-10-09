import { ApiResponse } from "@/util/api-response.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import { getClientRegisterValidator } from "@validator/register.validator.js";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  const registerValidator = getClientRegisterValidator();

  const userData = await registerValidator.safeParseAsync(req.body);
  console.log(userData);
  if (!userData.success) {
    console.log(userData.error.message);
  }

  res.status(HttpStatusCode.CREATED).send(ApiResponse.created(userData));
}
