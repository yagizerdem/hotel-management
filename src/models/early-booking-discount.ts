import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";
import { BOARD_TYPES } from "./room-rate";
import { RESERVATION_CHANNELS } from "./reservation";

/**
 * Discount for reservations made a minimum number of days before check-in.
 * A missing boardType means the rule applies to every board type.
 */
const earlyBookingDiscountSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    minDaysBefore: { type: Number, required: true, min: 0 },
    boardType: { type: String, enum: BOARD_TYPES },
    percent: { type: Number, required: true, min: 0, max: 100 },
    channels: { type: [{ type: String, enum: RESERVATION_CHANNELS }], default: ["web"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type EarlyBookingDiscount = InferSchemaType<typeof earlyBookingDiscountSchema>;
export type EarlyBookingDiscountDocument = HydratedDocument<EarlyBookingDiscount>;

const EarlyBookingDiscountModel: Model<EarlyBookingDiscount> =
  models.EarlyBookingDiscount ?? model("EarlyBookingDiscount", earlyBookingDiscountSchema);

export default EarlyBookingDiscountModel;
