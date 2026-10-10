import { ShiftModel } from "@/models/shift.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertShiftDTO,
  UpdateShiftDTO,
} from "@hotel-management/validator";

export async function ensureShiftExistById(id: string) {
  const shiftFromDb = await ShiftModel.findById(id);
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
) {
  const shiftFromDb = await ShiftModel.findOne({ staff, date });
  if (shiftFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Shift with staff ${staff} and date ${date.toISOString()} already exists`,
      isOperational: true,
    });
  }
}

export async function insertShift(dto: InsertShiftDTO) {
  await ensureShiftNotExistByStaffAndDate(dto.staff, dto.date);
  const shiftFromDb = await ShiftModel.insertOne(dto);
  return shiftFromDb;
}

export async function updateShift(id: string, dto: UpdateShiftDTO) {
  await ensureShiftExistById(id);

  const shift = await ShiftModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!shift) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "shift not found",
    });
  }

  return shift;
}

export async function deleteShiftById(id: string) {
  await ensureShiftExistById(id);

  const shift = await ShiftModel.findByIdAndDelete(id);

  if (!shift) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "shift not found",
    });
  }

  return shift;
}
