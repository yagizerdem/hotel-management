import { isValidObjectId } from "mongoose";
import UserModel from "@models/user";
import { AppError } from "@error/app-error";
import { MachineCode } from "@lib/machine-code";

const USER_NOT_FOUND = "We couldn't find this account.";
const EMAIL_IN_USE = "An account with this email already exists.";

// Emails are stored trimmed and in lower case, so look them up the same way.
function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

/** Throws a 404 AppError unless a user with this id exists. */
export async function ensureUserExistById(userId: string) {
  // A malformed id can't match any user, so it doesn't need a query.
  if (!isValidObjectId(userId) || !(await UserModel.exists({ _id: userId }))) {
    throw AppError.notFound(USER_NOT_FOUND, {
      machineCode: MachineCode.USER_NOT_FOUND,
    });
  }
}

/** Throws a 404 AppError unless a user with this email exists. */
export async function ensureUserExistByEmail(email: string) {
  if (
    !email.trim() ||
    !(await UserModel.exists({ email: normalizeEmail(email) }))
  ) {
    throw AppError.notFound(USER_NOT_FOUND, {
      machineCode: MachineCode.USER_NOT_FOUND,
    });
  }
}

/** Throws a 409 AppError if a user with this id already exists. */
export async function ensureUserNotExistById(userId: string) {
  if (isValidObjectId(userId) && (await UserModel.exists({ _id: userId }))) {
    throw AppError.conflict("This account already exists.", {
      machineCode: MachineCode.USER_ALREADY_EXISTS,
    });
  }
}

/**
 * Throws a 409 AppError if the email is already taken, with a field error
 * on email so the sign-up form can show it under that field.
 */
export async function ensureUserNotExistByEmail(email: string) {
  if (await UserModel.exists({ email: normalizeEmail(email) })) {
    throw AppError.conflict(EMAIL_IN_USE, {
      fieldErrors: { email: EMAIL_IN_USE },
      machineCode: MachineCode.EMAIL_IN_USE,
    });
  }
}
