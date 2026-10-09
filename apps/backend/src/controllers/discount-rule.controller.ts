import { ApiResponse } from "@/util/api-response.js";
import { DiscountRuleModel } from "@/models/discount-rule.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertDiscountRuleValidator } from "@hotel-management/validator/discount-rule";
import {
  getDiscountRuleIdParamValidator,
  getUpdateDiscountRuleValidator,
} from "@hotel-management/validator/discount-rule";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

export async function getDiscountRules(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(DiscountRuleModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const discountRuleModels = await apiFeatures.mongooseQuery;

  res.send(
    ApiResponse.ok(discountRuleModels, "discount rules fetched successfully"),
  );
}

export async function insertDiscountRule(req: Request, res: Response) {
  const validator = getInsertDiscountRuleValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert discount rule failed",
    "/api/discount-rules/insert",
  );

  await DiscountRuleModel.insertOne({
    ...data,
  });

  res.send(ApiResponse.ok(data, "discount rule inserted successfully"));
}

export async function updateDiscountRule(req: Request, res: Response) {
  const path = "/api/discount-rules/:id";
  const { id } = parseOrThrow(
    await getDiscountRuleIdParamValidator().safeParseAsync(req.params),
    "update discount rule failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateDiscountRuleValidator().safeParseAsync(req.body),
    "update discount rule failed",
    path,
  );

  const discountRule = await DiscountRuleModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!discountRule) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "discount rule not found",
      path,
    });
  }

  res.send(ApiResponse.ok(discountRule, "discount rule updated successfully"));
}

export async function deleteDiscountRule(req: Request, res: Response) {
  const path = "/api/discount-rules/:id";
  const { id } = parseOrThrow(
    await getDiscountRuleIdParamValidator().safeParseAsync(req.params),
    "delete discount rule failed",
    path,
  );

  const discountRule = await DiscountRuleModel.findByIdAndDelete(id);

  if (!discountRule) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "discount rule not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "discount rule deleted successfully"));
}
