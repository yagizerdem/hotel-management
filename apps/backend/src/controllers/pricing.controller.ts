import { ApiResponse } from "@/util/api-response.js";
import { PricingModel } from "@/models/pricing.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertPricingValidator } from "@hotel-management/validator/pricing";
import {
  getPricingIdParamValidator,
  getUpdatePricingValidator,
} from "@hotel-management/validator/pricing";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as pricingService from "@/services/pricing.service.js";

export async function getPricings(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(PricingModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const pricingModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(pricingModels, "pricings fetched successfully"));
}

export async function insertPricing(req: Request, res: Response) {
  const validator = getInsertPricingValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert pricing failed",
    "/api/pricings/insert",
  );

  await pricingService.insertPricing(data);

  res.send(ApiResponse.ok(data, "pricing inserted successfully"));
}

export async function updatePricing(req: Request, res: Response) {
  const path = "/api/pricings/:id";
  const { id } = parseOrThrow(
    await getPricingIdParamValidator().safeParseAsync(req.params),
    "update pricing failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdatePricingValidator().safeParseAsync(req.body),
    "update pricing failed",
    path,
  );

  const pricing = await pricingService.updatePricing(id, data);

  res.send(ApiResponse.ok(pricing, "pricing updated successfully"));
}

export async function deletePricing(req: Request, res: Response) {
  const path = "/api/pricings/:id";
  const { id } = parseOrThrow(
    await getPricingIdParamValidator().safeParseAsync(req.params),
    "delete pricing failed",
    path,
  );

  await pricingService.deletePricingById(id);

  res.send(ApiResponse.ok({ id }, "pricing deleted successfully"));
}
