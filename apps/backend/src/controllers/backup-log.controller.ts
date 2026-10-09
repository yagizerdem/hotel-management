import { ApiResponse } from "@/util/api-response.js";
import { BackupLogModel } from "@/models/backup-log.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertBackupLogValidator } from "@hotel-management/validator/backup-log";
import {
  getBackupLogIdParamValidator,
  getUpdateBackupLogValidator,
} from "@hotel-management/validator/backup-log";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

export async function getBackupLogs(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(BackupLogModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const backupLogModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(backupLogModels, "backup logs fetched successfully"));
}

export async function insertBackupLog(req: Request, res: Response) {
  const validator = getInsertBackupLogValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert backup log failed",
    "/api/backup-logs/insert",
  );

  await BackupLogModel.insertOne({
    ...data,
    performedBy: req.user?.id,
  });

  res.send(ApiResponse.ok(data, "backup log inserted successfully"));
}

export async function updateBackupLog(req: Request, res: Response) {
  const path = "/api/backup-logs/:id";
  const { id } = parseOrThrow(
    await getBackupLogIdParamValidator().safeParseAsync(req.params),
    "update backup log failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateBackupLogValidator().safeParseAsync(req.body),
    "update backup log failed",
    path,
  );

  const backupLog = await BackupLogModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!backupLog) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "backup log not found",
      path,
    });
  }

  res.send(ApiResponse.ok(backupLog, "backup log updated successfully"));
}

export async function deleteBackupLog(req: Request, res: Response) {
  const path = "/api/backup-logs/:id";
  const { id } = parseOrThrow(
    await getBackupLogIdParamValidator().safeParseAsync(req.params),
    "delete backup log failed",
    path,
  );

  const backupLog = await BackupLogModel.findByIdAndDelete(id);

  if (!backupLog) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "backup log not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "backup log deleted successfully"));
}
