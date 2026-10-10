import { ExtraChargeModel } from "@/models/extra-charge.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertExtraChargeDTO,
  UpdateExtraChargeDTO,
} from "@hotel-management/validator";

export async function ensureExtraChargeExistById(id: string) {
  const extraChargeFromDb = await ExtraChargeModel.findById(id);
  if (!extraChargeFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Extra charge with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return extraChargeFromDb;
}

export async function insertExtraCharge(
  dto: InsertExtraChargeDTO,
  createdBy?: string,
) {
  const extraChargeFromDb = await ExtraChargeModel.insertOne({
    ...dto,
    createdBy,
  });
  return extraChargeFromDb;
}

export async function updateExtraCharge(id: string, dto: UpdateExtraChargeDTO) {
  await ensureExtraChargeExistById(id);

  const extraCharge = await ExtraChargeModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!extraCharge) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "extra charge not found",
    });
  }

  return extraCharge;
}

export async function deleteExtraChargeById(id: string) {
  await ensureExtraChargeExistById(id);

  const extraCharge = await ExtraChargeModel.findByIdAndDelete(id);

  if (!extraCharge) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "extra charge not found",
    });
  }

  return extraCharge;
}
