import { ShiftModel } from "@/models/shift.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertShiftDTO,
  UpdateShiftDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureShiftExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const shiftFromDb = await ShiftModel.findById(id).session(session ?? null);
  if (!shiftFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Shift with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return shiftFromDb;
}

export async function ensureShiftNotExistByStaffAndDate(
  staff: string,
  date: Date,
  session?: mongoose.ClientSession,
) {
  const shiftFromDb = await ShiftModel.findOne({ staff, date }).session(
    session ?? null,
  );
  if (shiftFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Shift with staff ${staff} and date ${date.toISOString()} already exists`,
      isOperational: true,
    });
  }
}

export async function insertShift(
  dto: InsertShiftDTO,
  session?: mongoose.ClientSession,
) {
  await ensureShiftNotExistByStaffAndDate(dto.staff, dto.date, session);
  const shiftFromDb = await ShiftModel.insertOne(dto, { session });
  return shiftFromDb;
}

export async function updateShift(
  id: string,
  dto: UpdateShiftDTO,
  session?: mongoose.ClientSession,
) {
  await ensureShiftExistById(id, session);

  const shift = await ShiftModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!shift) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "shift not found",
    });
  }

  return shift;
}

export async function deleteShiftById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureShiftExistById(id, session);

  const shift = await ShiftModel.findByIdAndDelete(id, { session });

  if (!shift) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "shift not found",
    });
  }

  return shift;
}
