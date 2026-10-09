import { Schema, model, type InferSchemaType } from "mongoose";
import { ShiftType } from "@hotel-management/models";

const shiftSchema = new Schema(
  {
    staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: Object.values(ShiftType), required: true },
    startsAt: { type: Date },
    endsAt: { type: Date },
    overtimeHours: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

shiftSchema.index({ staff: 1, date: 1 }, { unique: true });
shiftSchema.index({ date: 1 });

export type Shift = InferSchemaType<typeof shiftSchema>;
export const ShiftModel = model("Shift", shiftSchema);
