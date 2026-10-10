import { ApiResponse } from "@/util/api-response.js";
import { StaffModel } from "@/models/staff.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertStaffValidator } from "@hotel-management/validator/staff";
import {
  getStaffIdParamValidator,
  getUpdateStaffValidator,
} from "@hotel-management/validator/staff";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as staffService from "@/services/staff.service.js";

export async function getAllStaff(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(StaffModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const staffModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(staffModels, "staff fetched successfully"));
}

export async function insertStaff(req: Request, res: Response) {
  const validator = getInsertStaffValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert staff failed",
    "/api/staff/insert",
  );

  await staffService.insertStaff(data);

  res.send(ApiResponse.ok(data, "staff inserted successfully"));
}

export async function updateStaff(req: Request, res: Response) {
  const path = "/api/staff/:id";
  const { id } = parseOrThrow(
    await getStaffIdParamValidator().safeParseAsync(req.params),
    "update staff failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateStaffValidator().safeParseAsync(req.body),
    "update staff failed",
    path,
  );

  const staff = await staffService.updateStaff(id, data);

  res.send(ApiResponse.ok(staff, "staff updated successfully"));
}

export async function deleteStaff(req: Request, res: Response) {
  const path = "/api/staff/:id";
  const { id } = parseOrThrow(
    await getStaffIdParamValidator().safeParseAsync(req.params),
    "delete staff failed",
    path,
  );

  await staffService.deleteStaffById(id);

  res.send(ApiResponse.ok({ id }, "staff deleted successfully"));
}
