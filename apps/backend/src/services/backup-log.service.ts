import { BackupLogModel } from "@/models/backup-log.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertBackupLogDTO,
  UpdateBackupLogDTO,
} from "@hotel-management/validator";

export async function ensureBackupLogExistById(id: string) {
  const backupLogFromDb = await BackupLogModel.findById(id);
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
) {
  const backupLogFromDb = await BackupLogModel.insertOne({
    ...dto,
    performedBy,
  });
  return backupLogFromDb;
}

export async function updateBackupLog(id: string, dto: UpdateBackupLogDTO) {
  await ensureBackupLogExistById(id);

  const backupLog = await BackupLogModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!backupLog) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "backup log not found",
    });
  }

  return backupLog;
}

export async function deleteBackupLogById(id: string) {
  await ensureBackupLogExistById(id);

  const backupLog = await BackupLogModel.findByIdAndDelete(id);

  if (!backupLog) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "backup log not found",
    });
  }

  return backupLog;
}
