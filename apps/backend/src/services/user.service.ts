import { UserModel } from "@/models/user.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type { InsertUserDTO, UpdateUserDTO } from "@hotel-management/validator";
import bcrypt from "bcrypt";

export async function ensureUserExistById(id: string) {
  const userFromDb = await UserModel.findById(id);
  if (!userFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `User with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return userFromDb;
}

export async function ensureUserNotExistByEmail(email: string) {
  const userFromDb = await UserModel.findOne({
    email: email.toLowerCase(),
  });
  if (userFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `User with email ${email} already exists`,
      isOperational: true,
    });
  }
}

// Stores only the hash; the plain password is never saved or returned.
export async function insertUser(dto: InsertUserDTO) {
  await ensureUserNotExistByEmail(dto.email);

  const { password, ...userData } = dto;
  const passwordHash = await bcrypt.hash(password, 10);

  await UserModel.insertOne({
    ...userData,
    passwordHash,
  });

  return userData;
}

export async function updateUser(id: string, dto: UpdateUserDTO) {
  await ensureUserExistById(id);

  // A new password is stored as a hash, like on insert.
  const { password, ...userData } = dto;
  const update =
    password === undefined
      ? userData
      : { ...userData, passwordHash: await bcrypt.hash(password, 10) };

  const user = await UserModel.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "user not found",
    });
  }

  return user;
}

export async function deleteUserById(id: string) {
  await ensureUserExistById(id);

  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "user not found",
    });
  }

  return user;
}
