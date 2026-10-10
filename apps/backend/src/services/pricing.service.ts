import { PricingModel } from "@/models/pricing.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertPricingDTO,
  UpdatePricingDTO,
} from "@hotel-management/validator";

export async function ensurePricingExistById(id: string) {
  const pricingFromDb = await PricingModel.findById(id);
  if (!pricingFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Pricing with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return pricingFromDb;
}

export async function insertPricing(dto: InsertPricingDTO) {
  const pricingFromDb = await PricingModel.insertOne(dto);
  return pricingFromDb;
}

export async function updatePricing(id: string, dto: UpdatePricingDTO) {
  await ensurePricingExistById(id);

  const pricing = await PricingModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!pricing) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "pricing not found",
    });
  }

  return pricing;
}

export async function deletePricingById(id: string) {
  await ensurePricingExistById(id);

  const pricing = await PricingModel.findByIdAndDelete(id);

  if (!pricing) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "pricing not found",
    });
  }

  return pricing;
}
