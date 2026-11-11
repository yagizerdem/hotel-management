"use server";

import { CredentialsSignin } from "next-auth";
import UserModel, { User } from "@models/user";
import dbConnect from "@lib/db";
import {
  getSignInSchema,
  getSignUpSchema,
  type SignInInput,
} from "@validator/auth-validator";
import { signIn, signOut as authSignOut, auth } from "@/src/auth/auth";
import { AppError } from "@error/app-error";
import { withActionErrorHandler } from "@error/with-error-handler";
import { ApiResponse } from "@lib/api-response";
import bcrypt from "bcrypt";
import { ensureUserNotExistByEmail } from "@service/user-service";
import { User as UserDomain } from "@domain/user";

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
    await dbConnect();
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

    const userFromDb = await UserModel.findOne({ email: result.data.email });
    if (!userFromDb) {
      throw AppError.notFound("User not found");
    }

    return ApiResponse.actionSuccess<UserDomain>("You're signed in.", {
      email: userFromDb.email,
      firstName: userFromDb.firstName,
      lastName: userFromDb.lastName,
      id: userFromDb.id,
    });
  },
);

export const signOut = withActionErrorHandler(async () => {
  // Without redirect: false, Auth.js redirects by throwing NEXT_REDIRECT, so
  // the action never returns and the caller can't tell how it went.
  await authSignOut({ redirect: false });
  return ApiResponse.actionSuccess("You're signed out.");
});

export const me = withActionErrorHandler(async () => {
  await dbConnect();
  const session = await auth();
  if (!session || !session.user) {
    throw AppError.unauthorized("Not authenticated");
  }
  const userFromDb = await UserModel.findById(session.user.id);
  if (!userFromDb) {
    throw AppError.notFound("User not found");
  }

  const userDomain: UserDomain = {
    id: userFromDb.id,
    firstName: userFromDb.firstName,
    lastName: userFromDb.lastName,
    email: userFromDb.email,
  };

  return ApiResponse.actionSuccess("Current user retrieved.", {
    ...userDomain,
  });
});
