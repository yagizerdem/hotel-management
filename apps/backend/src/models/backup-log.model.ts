import { Schema, model, type InferSchemaType } from "mongoose";
import { BackupAction } from "@hotel-management/models";

const backupLogSchema = new Schema(
  {
    action: { type: String, enum: Object.values(BackupAction), required: true },
    filePath: { type: String, required: true },
    sizeBytes: { type: Number, min: 0 },
    success: { type: Boolean, required: true },
    note: { type: String },
    performedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export type BackupLog = InferSchemaType<typeof backupLogSchema>;
export const BackupLogModel = model("BackupLog", backupLogSchema);
