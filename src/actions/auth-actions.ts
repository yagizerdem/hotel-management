"use server";

import { CredentialsSignin } from "next-auth";
import UserModel, { User } from "@models/user";
import dbConnect from "@lib/db";
import {
  getSignInSchema,
  getSignUpSchema,
  type SignInInput,
} from "@validator/auth-validator";
import { signIn } from "@/src/auth/auth";
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

/**
 * Signs in with email and password and sets the session cookie. A wrong
 * email or password comes back as a failure with the reason in `error`.
 */
export const signInWithCredentials = withActionErrorHandler(
  async (values: SignInInput) => {
    const result = getSignInSchema().safeParse(values);
    if (!result.success) {
      throw AppError.fromZod(result.error);
    }

    try {
      await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });
    } catch (error) {
      // authorize() turns its AppErrors into CredentialsSignin with the
      // message in `code`; turn it back so the form can show it.
      if (error instanceof CredentialsSignin) {
        throw AppError.unauthorized(error.code);
      }
      throw error;
    }

    return ApiResponse.actionSuccess("You're signed in.");
  },
);
