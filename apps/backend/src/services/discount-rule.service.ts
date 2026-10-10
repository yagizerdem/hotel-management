import { DiscountRuleModel } from "@/models/discount-rule.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertDiscountRuleDTO,
  UpdateDiscountRuleDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureDiscountRuleExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const discountRuleFromDb = await DiscountRuleModel.findById(id).session(
    session ?? null,
  );
  if (!discountRuleFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Discount rule with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return discountRuleFromDb;
}

export async function insertDiscountRule(
  dto: InsertDiscountRuleDTO,
  session?: mongoose.ClientSession,
) {
  const discountRuleFromDb = await DiscountRuleModel.insertOne(dto, {
    session,
  });
  return discountRuleFromDb;
}

export async function updateDiscountRule(
  id: string,
  dto: UpdateDiscountRuleDTO,
  session?: mongoose.ClientSession,
) {
  await ensureDiscountRuleExistById(id, session);

  const discountRule = await DiscountRuleModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!discountRule) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "discount rule not found",
    });
  }

  return discountRule;
}

export async function deleteDiscountRuleById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureDiscountRuleExistById(id, session);

  const discountRule = await DiscountRuleModel.findByIdAndDelete(id, {
    session,
  });

  if (!discountRule) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "discount rule not found",
    });
  }

  return discountRule;
}
