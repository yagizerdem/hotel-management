import { ExtraChargeModel } from "@/models/extra-charge.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertExtraChargeDTO,
  UpdateExtraChargeDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureExtraChargeExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const extraChargeFromDb = await ExtraChargeModel.findById(id).session(
    session ?? null,
  );
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
  session?: mongoose.ClientSession,
) {
  const extraChargeFromDb = await ExtraChargeModel.insertOne(
    {
      ...dto,
      createdBy,
    },
    { session },
  );
  return extraChargeFromDb;
}

export async function updateExtraCharge(
  id: string,
  dto: UpdateExtraChargeDTO,
  session?: mongoose.ClientSession,
) {
  await ensureExtraChargeExistById(id, session);

  const extraCharge = await ExtraChargeModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!extraCharge) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "extra charge not found",
    });
  }

  return extraCharge;
}

export async function deleteExtraChargeById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureExtraChargeExistById(id, session);

  const extraCharge = await ExtraChargeModel.findByIdAndDelete(id, { session });

  if (!extraCharge) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "extra charge not found",
    });
  }

  return extraCharge;
}
