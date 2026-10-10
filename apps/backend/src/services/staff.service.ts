import { StaffModel } from "@/models/staff.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertStaffDTO,
  UpdateStaffDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureStaffExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const staffFromDb = await StaffModel.findById(id).session(session ?? null);
  if (!staffFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Staff with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return staffFromDb;
}

export async function ensureStaffNotExistByTcKimlikNo(
  tcKimlikNo: string,
  session?: mongoose.ClientSession,
) {
  const staffFromDb = await StaffModel.findOne({ tcKimlikNo }).session(
    session ?? null,
  );
  if (staffFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Staff with TC Kimlik No ${tcKimlikNo} already exists`,
      isOperational: true,
    });
  }
}

export async function insertStaff(
  dto: InsertStaffDTO,
  session?: mongoose.ClientSession,
) {
  await ensureStaffNotExistByTcKimlikNo(dto.tcKimlikNo, session);
  const staffFromDb = await StaffModel.insertOne(dto, { session });
  return staffFromDb;
}

export async function updateStaff(
  id: string,
  dto: UpdateStaffDTO,
  session?: mongoose.ClientSession,
) {
  await ensureStaffExistById(id, session);

  const staff = await StaffModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!staff) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "staff not found",
    });
  }

  return staff;
}

export async function deleteStaffById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureStaffExistById(id, session);

  const staff = await StaffModel.findByIdAndDelete(id, { session });

  if (!staff) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "staff not found",
    });
  }

  return staff;
}
