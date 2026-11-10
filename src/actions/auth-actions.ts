"use server";

import { User } from "@models/user";
import dbConnect from "@lib/db";
import { getSignUpSchema } from "@validator/auth-validator";
import { AppError } from "@error/app-error";

export async function signUp(user: Partial<User>) {
  await dbConnect();
  const schema = getSignUpSchema();
  const result = schema.safeParse(user);
  if (!result.success) {
    throw AppError.fromZod(result.error);
  }

  return "fucker";
}
