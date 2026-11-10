import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const CHARGE_CATEGORIES = [
  "minibar",
  "bar",
  "snack_bar",
  "restaurant",
  "room_service",
  "laundry",
  "spa",
  "other",
] as const;

/**
 * Extra spending posted to a stay and settled at check-out.
 */
const chargeSchema = new Schema(
  {
    reservation: { type: Schema.Types.ObjectId, ref: "Reservation", required: true, index: true },
    category: { type: String, enum: CHARGE_CATEGORIES, required: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, default: "TRY" },
    postedAt: { type: Date, required: true, default: Date.now },
    postedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true },
);

export type Charge = InferSchemaType<typeof chargeSchema>;
export type ChargeDocument = HydratedDocument<Charge>;

const ChargeModel: Model<Charge> = models.Charge ?? model("Charge", chargeSchema);

export default ChargeModel;
