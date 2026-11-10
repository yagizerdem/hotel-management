"use server";

import UserModel, { User } from "@models/user";
import dbConnect from "@lib/db";
import { getSignUpSchema } from "@validator/auth-validator";
import { AppError } from "@error/app-error";
import { withActionErrorHandler } from "@error/with-error-handler";
import { ApiResponse } from "@lib/api-response";

export const signUp = withActionErrorHandler(async (user: Partial<User>) => {
  await dbConnect();
  const schema = getSignUpSchema();
  const result = schema.safeParse(user);
  if (!result.success) {
    throw AppError.fromZod(result.error);
  }

  const createdUser = await UserModel.create(result.data);

  return ApiResponse.actionSuccess("User created successfully.", createdUser);
});
