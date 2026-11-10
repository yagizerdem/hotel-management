import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const SHIFTS = ["morning", "evening", "night", "office"] as const;
export type Shift = (typeof SHIFTS)[number];

export const SHIFT_HOURS: Record<Shift, { start: number; end: number }> = {
  morning: { start: 8, end: 16 },
  evening: { start: 16, end: 24 },
  night: { start: 0, end: 8 },
  // Electrician and IT work regular office hours.
  office: { start: 8, end: 18 },
};

/**
 * A shift worked by an employee. Overtime is a separate assignment with
 * isOvertime set, so the payroll can count it apart.
 */
const shiftAssignmentSchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: Date, required: true },
    shift: { type: String, enum: SHIFTS, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    isOvertime: { type: Boolean, default: false },
    note: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true },
);

shiftAssignmentSchema.index({ employee: 1, startsAt: 1 }, { unique: true });
shiftAssignmentSchema.index({ date: 1, shift: 1 });

export type ShiftAssignment = InferSchemaType<typeof shiftAssignmentSchema>;
export type ShiftAssignmentDocument = HydratedDocument<ShiftAssignment>;

const ShiftAssignmentModel: Model<ShiftAssignment> =
  models.ShiftAssignment ?? model("ShiftAssignment", shiftAssignmentSchema);

export default ShiftAssignmentModel;
