import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";
import { PAY_TYPES } from "./employee";

export const PAYROLL_STATUSES = ["draft", "approved", "paid"] as const;

/**
 * Month-end pay of one employee. Hourly pay is worked out from the shift
 * assignments; wages are copied so later wage changes do not alter it.
 */
const payrollSchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    payType: { type: String, enum: PAY_TYPES, required: true },
    regularHours: { type: Number, min: 0, default: 0 },
    overtimeHours: { type: Number, min: 0, default: 0 },
    hourlyWage: { type: Number, min: 0 },
    monthlySalary: { type: Number, min: 0 },
    grossAmount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, default: "TRY" },
    status: { type: String, enum: PAYROLL_STATUSES, required: true, default: "draft" },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

payrollSchema.index({ employee: 1, year: 1, month: 1 }, { unique: true });

export type Payroll = InferSchemaType<typeof payrollSchema>;
export type PayrollDocument = HydratedDocument<Payroll>;

const PayrollModel: Model<Payroll> = models.Payroll ?? model("Payroll", payrollSchema);

export default PayrollModel;
