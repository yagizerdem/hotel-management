import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { PAY_TYPES, STAFF_POSITIONS } from "./constants";

const staffSchema = new Schema(
  {
    // Login account, only for staff who use the system
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    position: { type: String, enum: STAFF_POSITIONS, required: true },
    // Managers are paid monthly, everyone else by the hour
    payType: { type: String, enum: PAY_TYPES, required: true },
    hourlyRate: { type: Number, min: 0 },
    monthlySalary: { type: Number, min: 0 },
    hiredAt: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

staffSchema.pre("validate", function () {
  if (this.payType === "hourly" && this.hourlyRate == null) {
    this.invalidate("hourlyRate", "hourlyRate is required for hourly pay");
  }
  if (this.payType === "monthly" && this.monthlySalary == null) {
    this.invalidate("monthlySalary", "monthlySalary is required for monthly pay");
  }
});

export type Staff = InferSchemaType<typeof staffSchema>;
export const StaffModel =
  (models.Staff as Model<Staff>) || model<Staff>("Staff", staffSchema);
