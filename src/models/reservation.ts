import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";
import { BOARD_TYPES } from "./room-rate";

export const RESERVATION_CHANNELS = ["web", "reception", "phone"] as const;
export const RESERVATION_STATUSES = [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
  "no_show",
] as const;

// Every stay starts at 14:00 on the check-in day and ends at 10:00 on the check-out day.
export const CHECK_IN_HOUR = 14;
export const CHECK_OUT_HOUR = 10;

const nightlyRateSchema = new Schema(
  {
    night: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const pricingSchema = new Schema(
  {
    currency: { type: String, required: true, uppercase: true, default: "TRY" },
    nightlyRates: { type: [nightlyRateSchema], default: [] },
    subtotal: { type: Number, required: true, min: 0 },
    discount: {
      rule: { type: Schema.Types.ObjectId, ref: "EarlyBookingDiscount" },
      percent: { type: Number, min: 0, max: 100, default: 0 },
      amount: { type: Number, min: 0, default: 0 },
    },
    total: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const reservationSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    channel: { type: String, enum: RESERVATION_CHANNELS, required: true },
    status: { type: String, enum: RESERVATION_STATUSES, required: true, default: "pending" },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    roomType: { type: Schema.Types.ObjectId, ref: "RoomType", required: true },
    boardType: { type: String, enum: BOARD_TYPES, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true, min: 1 },
    primaryGuest: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    guests: {
      type: [{ type: Schema.Types.ObjectId, ref: "Guest" }],
      validate: (value: unknown[]) => value.length > 0,
    },
    // Web account that made the booking, if any.
    bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
    // Reception staff who entered or handled the booking.
    handledBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    pricing: { type: pricingSchema, required: true },
    checkedInAt: { type: Date },
    checkedOutAt: { type: Date },
    cancelledAt: { type: Date },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

reservationSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
reservationSchema.index({ primaryGuest: 1, checkIn: -1 });
reservationSchema.index({ guests: 1 });
reservationSchema.index({ status: 1, checkOut: 1 });

export type Reservation = InferSchemaType<typeof reservationSchema>;
export type ReservationDocument = HydratedDocument<Reservation>;

const ReservationModel: Model<Reservation> =
  models.Reservation ?? model("Reservation", reservationSchema);

export default ReservationModel;
