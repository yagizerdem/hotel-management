import mongoose from "mongoose";

const salaryPaymentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    totalHours: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paidAt: Date,
    status: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

const SalaryPayment =
  mongoose.models.SalaryPayment ||
  mongoose.model("SalaryPayment", salaryPaymentSchema);

export { SalaryPayment };
