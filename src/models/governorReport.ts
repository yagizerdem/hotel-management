import mongoose from "mongoose";

const governorReportSchema = new mongoose.Schema(
  {
    reportDate: { type: Date, required: true },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
    },
    responseMessage: String,
  },
  { timestamps: true },
);

const GovernorReport =
  mongoose.models.GovernorReport ||
  mongoose.model("GovernorReport", governorReportSchema);

export { GovernorReport };
