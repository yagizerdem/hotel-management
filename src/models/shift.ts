import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { SHIFT_TYPE_KEYS } from "./constants";

const shiftSchema = new Schema(
  {
    staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    // Start of the day the shift begins on
    date: { type: Date, required: true },
    type: { type: String, enum: SHIFT_TYPE_KEYS, required: true },
    // Hours worked beyond the shift, added to monthly pay
    overtimeHours: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

shiftSchema.index({ staff: 1, date: 1 }, { unique: true });

export type Shift = InferSchemaType<typeof shiftSchema>;
export const ShiftModel =
  (models.Shift as Model<Shift>) || model<Shift>("Shift", shiftSchema);
