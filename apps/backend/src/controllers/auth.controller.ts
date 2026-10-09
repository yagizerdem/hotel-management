import { ApiResponse } from "@/util/api-response.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import { getRegisterValidator } from "@validator/register.validator.js";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  const registerValidator = getRegisterValidator();

  const userData = await registerValidator.parseAsync(req.body);

  res.status(HttpStatusCode.CREATED).send(ApiResponse.created(userData));
}
