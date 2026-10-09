import { Schema, model, type InferSchemaType } from "mongoose";
import { ReportStatus } from "@hotel-management/models";

const governorateReportSchema = new Schema(
  {
    reportDate: { type: Date, required: true, unique: true },
    status: { type: String, enum: Object.values(ReportStatus), default: ReportStatus.PENDING },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
    guestCount: { type: Number, default: 0, min: 0 },
    attempts: { type: Number, default: 0, min: 0 },
    sentAt: { type: Date },
    responseMessage: { type: String },
  },
  { timestamps: true },
);

export type GovernorateReport = InferSchemaType<typeof governorateReportSchema>;
export const GovernorateReportModel = model("GovernorateReport", governorateReportSchema);
