import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { CURRENCIES } from "./constants";

// Extra spending (bar, snack bar...) billed to a reservation at check-out
const extraChargeSchema = new Schema(
  {
    reservation: {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
      index: true,
    },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, min: 1, default: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: CURRENCIES, default: "TRY" },
    chargedAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export type ExtraCharge = InferSchemaType<typeof extraChargeSchema>;
export const ExtraChargeModel =
  (models.ExtraCharge as Model<ExtraCharge>) ||
  model<ExtraCharge>("ExtraCharge", extraChargeSchema);
