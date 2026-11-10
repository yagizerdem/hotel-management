import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const PAYMENT_METHODS = ["cash", "credit_card", "bank_transfer"] as const;
export const PAYMENT_KINDS = ["deposit", "settlement", "refund"] as const;

const paymentSchema = new Schema(
  {
    reservation: { type: Schema.Types.ObjectId, ref: "Reservation", required: true, index: true },
    kind: { type: String, enum: PAYMENT_KINDS, required: true },
    method: { type: String, enum: PAYMENT_METHODS, required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, default: "TRY" },
    // TRY value of one unit of the currency on the payment day.
    exchangeRate: { type: Number, min: 0, default: 1 },
    paidAt: { type: Date, required: true, default: Date.now },
    receivedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true },
);

export type Payment = InferSchemaType<typeof paymentSchema>;
export type PaymentDocument = HydratedDocument<Payment>;

const PaymentModel: Model<Payment> = models.Payment ?? model("Payment", paymentSchema);

export default PaymentModel;
