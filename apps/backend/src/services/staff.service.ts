import { StaffModel } from "@/models/staff.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertStaffDTO,
  UpdateStaffDTO,
} from "@hotel-management/validator";

export async function ensureStaffExistById(id: string) {
  const staffFromDb = await StaffModel.findById(id);
  if (!staffFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Staff with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return staffFromDb;
}

export async function ensureStaffNotExistByTcKimlikNo(tcKimlikNo: string) {
  const staffFromDb = await StaffModel.findOne({ tcKimlikNo });
  if (staffFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Staff with TC Kimlik No ${tcKimlikNo} already exists`,
      isOperational: true,
    });
  }
}

export async function insertStaff(dto: InsertStaffDTO) {
  await ensureStaffNotExistByTcKimlikNo(dto.tcKimlikNo);
  const staffFromDb = await StaffModel.insertOne(dto);
  return staffFromDb;
}

export async function updateStaff(id: string, dto: UpdateStaffDTO) {
  await ensureStaffExistById(id);

  const staff = await StaffModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!staff) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "staff not found",
    });
  }

  return staff;
}

export async function deleteStaffById(id: string) {
  await ensureStaffExistById(id);

  const staff = await StaffModel.findByIdAndDelete(id);

  if (!staff) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "staff not found",
    });
  }

  return staff;
}
