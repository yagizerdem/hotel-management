import { z } from "zod";
import { BackupAction } from "@hotel-management/models";

export function getInsertBackupLogValidator() {
  const validator = z.object({
    action: z.enum(BackupAction),
    filePath: z.string().trim().min(1),
    sizeBytes: z.number().int().min(0).optional(),
    success: z.boolean(),
    note: z.string().optional(),
  });

  return validator;
}

export function getBackupLogIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid backup log id."),
  });
}

export function getUpdateBackupLogValidator() {
  return z
    .object({
      action: z.enum(BackupAction),
      filePath: z.string().trim().min(1),
      sizeBytes: z.number().int().min(0),
      success: z.boolean(),
      note: z.string(),
    })
    .partial()
    .refine((backupLog) => Object.keys(backupLog).length > 0, {
      message: "At least one field is required.",
    });
}

export type BackupLogIdParamDTO = z.infer<
  ReturnType<typeof getBackupLogIdParamValidator>
>;
export type UpdateBackupLogDTO = z.infer<
  ReturnType<typeof getUpdateBackupLogValidator>
>;

export type InsertBackupLogDTO = z.infer<
  ReturnType<typeof getInsertBackupLogValidator>
>;
