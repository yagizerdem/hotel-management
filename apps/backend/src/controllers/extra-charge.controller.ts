import { ApiResponse } from "@/util/api-response.js";
import { ExtraChargeModel } from "@/models/extra-charge.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertExtraChargeValidator } from "@hotel-management/validator/extra-charge";
import {
  getExtraChargeIdParamValidator,
  getUpdateExtraChargeValidator,
} from "@hotel-management/validator/extra-charge";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as extraChargeService from "@/services/extra-charge.service.js";

export async function getExtraCharges(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(ExtraChargeModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const extraChargeModels = await apiFeatures.mongooseQuery;

  res.send(
    ApiResponse.ok(extraChargeModels, "extra charges fetched successfully"),
  );
}

export async function insertExtraCharge(req: Request, res: Response) {
  const validator = getInsertExtraChargeValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert extra charge failed",
    "/api/extra-charges/insert",
  );

  await extraChargeService.insertExtraCharge(data, req.user?.id);

  res.send(ApiResponse.ok(data, "extra charge inserted successfully"));
}

export async function updateExtraCharge(req: Request, res: Response) {
  const path = "/api/extra-charges/:id";
  const { id } = parseOrThrow(
    await getExtraChargeIdParamValidator().safeParseAsync(req.params),
    "update extra charge failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateExtraChargeValidator().safeParseAsync(req.body),
    "update extra charge failed",
    path,
  );

  const extraCharge = await extraChargeService.updateExtraCharge(id, data);

  res.send(ApiResponse.ok(extraCharge, "extra charge updated successfully"));
}

export async function deleteExtraCharge(req: Request, res: Response) {
  const path = "/api/extra-charges/:id";
  const { id } = parseOrThrow(
    await getExtraChargeIdParamValidator().safeParseAsync(req.params),
    "delete extra charge failed",
    path,
  );

  await extraChargeService.deleteExtraChargeById(id);

  res.send(ApiResponse.ok({ id }, "extra charge deleted successfully"));
}
