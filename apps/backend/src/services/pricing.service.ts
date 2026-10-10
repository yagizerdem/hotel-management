import { PricingModel } from "@/models/pricing.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertPricingDTO,
  UpdatePricingDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensurePricingExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const pricingFromDb = await PricingModel.findById(id).session(
    session ?? null,
  );
  if (!pricingFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Pricing with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return pricingFromDb;
}

export async function insertPricing(
  dto: InsertPricingDTO,
  session?: mongoose.ClientSession,
) {
  const pricingFromDb = await PricingModel.insertOne(dto, { session });
  return pricingFromDb;
}

export async function updatePricing(
  id: string,
  dto: UpdatePricingDTO,
  session?: mongoose.ClientSession,
) {
  await ensurePricingExistById(id, session);

  const pricing = await PricingModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!pricing) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "pricing not found",
    });
  }

  return pricing;
}

export async function deletePricingById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensurePricingExistById(id, session);

  const pricing = await PricingModel.findByIdAndDelete(id, { session });

  if (!pricing) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "pricing not found",
    });
  }

  return pricing;
}
