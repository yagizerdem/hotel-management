import { ApiResponse } from "@/util/api-response.js";
import { UserModel } from "@/models/user.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertUserValidator } from "@hotel-management/validator/user";
import {
  getUserIdParamValidator,
  getUpdateUserValidator,
} from "@hotel-management/validator/user";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import bcrypt from "bcrypt";

export async function getUsers(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(UserModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const userModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(userModels, "users fetched successfully"));
}

export async function insertUser(req: Request, res: Response) {
  const validator = getInsertUserValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert user failed",
    "/api/users/insert",
  );

  // Store only the hash; the plain password is never saved or returned.
  const { password, ...userData } = data;
  const passwordHash = await bcrypt.hash(password, 10);

  await UserModel.insertOne({
    ...userData,
    passwordHash,
  });

  res.send(ApiResponse.ok(userData, "user inserted successfully"));
}

export async function updateUser(req: Request, res: Response) {
  const path = "/api/users/:id";
  const { id } = parseOrThrow(
    await getUserIdParamValidator().safeParseAsync(req.params),
    "update user failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateUserValidator().safeParseAsync(req.body),
    "update user failed",
    path,
  );

  // A new password is stored as a hash, like on insert.
  const { password, ...userData } = data;
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
      path,
    });
  }

  res.send(ApiResponse.ok(user, "user updated successfully"));
}

export async function deleteUser(req: Request, res: Response) {
  const path = "/api/users/:id";
  const { id } = parseOrThrow(
    await getUserIdParamValidator().safeParseAsync(req.params),
    "delete user failed",
    path,
  );

  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "user not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "user deleted successfully"));
}
