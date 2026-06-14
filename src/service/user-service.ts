import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { User } from "../models/user";

async function ensureUserExistByUserName(userName: string) {
  const user = await User.findOne({ username: userName });
  if (!user) {
    throw new AppError({
      message: `User with username ${userName} not found`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return user;
}

async function ensureUserExistByEmail(email: string) {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError({
      message: `User with email ${email} not found`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return user;
}

export { ensureUserExistByUserName, ensureUserExistByEmail };
