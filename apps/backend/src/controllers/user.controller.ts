import { ApiResponse } from "@/util/api-response.js";
import { UserModel } from "@/models/user.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertUserValidator } from "@hotel-management/validator/user";
import {
  getUserIdParamValidator,
  getUpdateUserValidator,
} from "@hotel-management/validator/user";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as userService from "@/services/user.service.js";

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

  const userData = await userService.insertUser(data);

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

  const user = await userService.updateUser(id, data);

  res.send(ApiResponse.ok(user, "user updated successfully"));
}

export async function deleteUser(req: Request, res: Response) {
  const path = "/api/users/:id";
  const { id } = parseOrThrow(
    await getUserIdParamValidator().safeParseAsync(req.params),
    "delete user failed",
    path,
  );

  await userService.deleteUserById(id);

  res.send(ApiResponse.ok({ id }, "user deleted successfully"));
}
