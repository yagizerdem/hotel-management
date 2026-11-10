import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const AUTHORITY_REPORT_STATUSES = ["pending", "sent", "failed"] as const;

const reportedGuestSchema = new Schema(
  {
    guest: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    reservation: { type: Schema.Types.ObjectId, ref: "Reservation", required: true },
    roomNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalId: { type: String },
    passportNumber: { type: String },
    nationality: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
  },
  { _id: false },
);

/**
 * Daily list of staying guests sent to the governorship over its XML web
 * service. Guest data is copied so the report shows what was sent.
 */
const authorityReportSchema = new Schema(
  {
    reportDate: { type: Date, required: true, unique: true },
    guests: { type: [reportedGuestSchema], default: [] },
    status: { type: String, enum: AUTHORITY_REPORT_STATUSES, required: true, default: "pending" },
    attempts: { type: Number, min: 0, default: 0 },
    sentAt: { type: Date },
    responseReference: { type: String },
    lastError: { type: String },
  },
  { timestamps: true },
);

export type AuthorityReport = InferSchemaType<typeof authorityReportSchema>;
export type AuthorityReportDocument = HydratedDocument<AuthorityReport>;

const AuthorityReportModel: Model<AuthorityReport> =
  models.AuthorityReport ?? model("AuthorityReport", authorityReportSchema);

export default AuthorityReportModel;
