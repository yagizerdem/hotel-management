"use server";

import UserModel, { User } from "@models/user";
import dbConnect from "@lib/db";
import { getSignUpSchema } from "@validator/auth-validator";
import { AppError } from "@error/app-error";
import { withActionErrorHandler } from "@error/with-error-handler";
import { ApiResponse } from "@lib/api-response";
import bcrypt from "bcrypt";
import { ensureUserNotExistByEmail } from "@service/user-service";

export const signUp = withActionErrorHandler(async (user: Partial<User>) => {
  await dbConnect();
  const schema = getSignUpSchema();
  const result = schema.safeParse(user);
  if (!result.success) {
    throw AppError.fromZod(result.error);
  }

  await ensureUserNotExistByEmail(result.data.email);

  const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const createdUser = await UserModel.create({
    ...result.data,
    passwordHash: hashedPassword,
  });

  return ApiResponse.actionSuccess("User created successfully.", createdUser);
});
