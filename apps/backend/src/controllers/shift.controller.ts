import { ApiResponse } from "@/util/api-response.js";
import { ShiftModel } from "@/models/shift.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertShiftValidator } from "@hotel-management/validator/shift";
import {
  getShiftIdParamValidator,
  getUpdateShiftValidator,
} from "@hotel-management/validator/shift";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

export async function getShifts(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(ShiftModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const shiftModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(shiftModels, "shifts fetched successfully"));
}

export async function insertShift(req: Request, res: Response) {
  const validator = getInsertShiftValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert shift failed",
    "/api/shifts/insert",
  );

  await ShiftModel.insertOne({
    ...data,
  });

  res.send(ApiResponse.ok(data, "shift inserted successfully"));
}

export async function updateShift(req: Request, res: Response) {
  const path = "/api/shifts/:id";
  const { id } = parseOrThrow(
    await getShiftIdParamValidator().safeParseAsync(req.params),
    "update shift failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateShiftValidator().safeParseAsync(req.body),
    "update shift failed",
    path,
  );

  const shift = await ShiftModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!shift) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "shift not found",
      path,
    });
  }

  res.send(ApiResponse.ok(shift, "shift updated successfully"));
}

export async function deleteShift(req: Request, res: Response) {
  const path = "/api/shifts/:id";
  const { id } = parseOrThrow(
    await getShiftIdParamValidator().safeParseAsync(req.params),
    "delete shift failed",
    path,
  );

  const shift = await ShiftModel.findByIdAndDelete(id);

  if (!shift) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "shift not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "shift deleted successfully"));
}
