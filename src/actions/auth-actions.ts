"use server";

import { User } from "@models/user";
import dbConnect from "@lib/db";
import { getSignUpSchema } from "@validator/auth-validator";

export async function signUp(user: Partial<User>) {
  await dbConnect();
  const schema = getSignUpSchema();
  const result = schema.safeParse(user);
  if (!result.success) {
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(", "),
    );
  }

  return "fucker";
}
