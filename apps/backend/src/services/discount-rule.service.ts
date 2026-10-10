import { DiscountRuleModel } from "@/models/discount-rule.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertDiscountRuleDTO,
  UpdateDiscountRuleDTO,
} from "@hotel-management/validator";

export async function ensureDiscountRuleExistById(id: string) {
  const discountRuleFromDb = await DiscountRuleModel.findById(id);
  if (!discountRuleFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Discount rule with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return discountRuleFromDb;
}

export async function insertDiscountRule(dto: InsertDiscountRuleDTO) {
  const discountRuleFromDb = await DiscountRuleModel.insertOne(dto);
  return discountRuleFromDb;
}

export async function updateDiscountRule(
  id: string,
  dto: UpdateDiscountRuleDTO,
) {
  await ensureDiscountRuleExistById(id);

  const discountRule = await DiscountRuleModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!discountRule) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "discount rule not found",
    });
  }

  return discountRule;
}

export async function deleteDiscountRuleById(id: string) {
  await ensureDiscountRuleExistById(id);

  const discountRule = await DiscountRuleModel.findByIdAndDelete(id);

  if (!discountRule) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "discount rule not found",
    });
  }

  return discountRule;
}
