import { Schema, model, type InferSchemaType } from "mongoose";
import { PayType, StaffPosition } from "./enums.js";

const staffSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    tcKimlikNo: { type: String, match: /^\d{11}$/, unique: true, sparse: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    position: { type: String, enum: Object.values(StaffPosition), required: true },
    payType: { type: String, enum: Object.values(PayType), required: true },
    hourlyWage: { type: Number, min: 0 },
    monthlySalary: { type: Number, min: 0 },
    hireDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

staffSchema.pre("validate", function () {
  if (this.payType === PayType.HOURLY && this.hourlyWage == null) {
    this.invalidate("hourlyWage", "hourlyWage is required for hourly staff");
  }
  if (this.payType === PayType.MONTHLY && this.monthlySalary == null) {
    this.invalidate("monthlySalary", "monthlySalary is required for monthly staff");
  }
});

export type Staff = InferSchemaType<typeof staffSchema>;
export const StaffModel = model("Staff", staffSchema);
