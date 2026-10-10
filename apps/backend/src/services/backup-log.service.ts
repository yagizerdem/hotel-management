import { BackupLogModel } from "@/models/backup-log.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertBackupLogDTO,
  UpdateBackupLogDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureBackupLogExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const backupLogFromDb = await BackupLogModel.findById(id).session(
    session ?? null,
  );
  if (!backupLogFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Backup log with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return backupLogFromDb;
}

export async function insertBackupLog(
  dto: InsertBackupLogDTO,
  performedBy?: string,
  session?: mongoose.ClientSession,
) {
  const backupLogFromDb = await BackupLogModel.insertOne(
    {
      ...dto,
      performedBy,
    },
    { session },
  );
  return backupLogFromDb;
}

export async function updateBackupLog(
  id: string,
  dto: UpdateBackupLogDTO,
  session?: mongoose.ClientSession,
) {
  await ensureBackupLogExistById(id, session);

  const backupLog = await BackupLogModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!backupLog) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "backup log not found",
    });
  }

  return backupLog;
}

export async function deleteBackupLogById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureBackupLogExistById(id, session);

  const backupLog = await BackupLogModel.findByIdAndDelete(id, { session });

  if (!backupLog) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "backup log not found",
    });
  }

  return backupLog;
}
