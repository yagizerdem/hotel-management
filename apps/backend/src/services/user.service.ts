import { UserModel } from "@/models/user.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type { InsertUserDTO, UpdateUserDTO } from "@hotel-management/validator";
import bcrypt from "bcrypt";
import type mongoose from "mongoose";

export async function ensureUserExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const userFromDb = await UserModel.findById(id).session(session ?? null);
  if (!userFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `User with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return userFromDb;
}

export async function ensureUserNotExistByEmail(
  email: string,
  session?: mongoose.ClientSession,
) {
  const userFromDb = await UserModel.findOne({
    email: email.toLowerCase(),
  }).session(session ?? null);
  if (userFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `User with email ${email} already exists`,
      isOperational: true,
    });
  }
}

export async function ensureUserIsActiveById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const userFromDb = await ensureUserExistById(id, session);
  if (!userFromDb.isActive) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.FORBIDDEN,
      message: `User with id ${id} is not active`,
      isOperational: true,
    });
  }
  return userFromDb;
}

export async function ensureUserExistByEmail(
  email: string,
  session?: mongoose.ClientSession,
) {
  const userFromDb = await UserModel.findOne({
    email: email.toLowerCase(),
  }).session(session ?? null);
  if (!userFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `User with email ${email} does not exist`,
      isOperational: true,
    });
  }
  return userFromDb;
}

export async function ensureUserIsActiveByEmail(
  email: string,
  session?: mongoose.ClientSession,
) {
  const userFromDb = await ensureUserExistByEmail(email, session);
  if (!userFromDb.isActive) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.FORBIDDEN,
      message: `User with email ${email} is not active`,
      isOperational: true,
    });
  }
  return userFromDb;
}

// Stores only the hash; the plain password is never saved or returned.
export async function insertUser(
  dto: InsertUserDTO,
  session?: mongoose.ClientSession,
) {
  await ensureUserNotExistByEmail(dto.email, session);

  const { password, ...userData } = dto;
  const passwordHash = await bcrypt.hash(password, 10);

  await UserModel.insertOne(
    {
      ...userData,
      passwordHash,
    },
    { session },
  );

  return userData;
}

export async function updateUser(
  id: string,
  dto: UpdateUserDTO,
  session?: mongoose.ClientSession,
) {
  await ensureUserExistById(id, session);

  // A new password is stored as a hash, like on insert.
  const { password, ...userData } = dto;
  const update =
    password === undefined
      ? userData
      : { ...userData, passwordHash: await bcrypt.hash(password, 10) };

  const user = await UserModel.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true, runValidators: true, session },
  );

  if (!user) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "user not found",
    });
  }

  return user;
}

export async function deleteUserById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureUserExistById(id, session);

  const user = await UserModel.findByIdAndDelete(id, { session });

  if (!user) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "user not found",
    });
  }

  return user;
}
