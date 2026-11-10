import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import {
  BOARD_TYPES,
  CURRENCIES,
  RESERVATION_SOURCES,
  RESERVATION_STATUSES,
} from "./constants";

const reservationSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    // Other people staying in the room, reported to the governorate daily
    guests: [{ type: Schema.Types.ObjectId, ref: "Customer" }],
    source: { type: String, enum: RESERVATION_SOURCES, required: true },
    status: {
      type: String,
      enum: RESERVATION_STATUSES,
      default: "confirmed",
      required: true,
    },
    boardType: { type: String, enum: BOARD_TYPES, required: true },
    // Check-in is at 14:00 and check-out at 10:00 on these dates
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    // Price snapshot, so later price changes do not affect existing bookings
    nights: { type: Number, required: true, min: 1 },
    nightlyPrice: { type: Number, required: true, min: 0 },
    discountRate: { type: Number, min: 0, max: 1, default: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: CURRENCIES, default: "TRY" },
    // Receptionist who created it, empty for web reservations
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    cancelledAt: Date,
  },
  { timestamps: true },
);

// Overlap lookups for double-booking checks
reservationSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
reservationSchema.index({ customer: 1, checkIn: -1 });
reservationSchema.index({ status: 1, checkIn: 1 });

reservationSchema.pre("validate", function () {
  if (this.checkOut <= this.checkIn) {
    this.invalidate("checkOut", "checkOut must be after checkIn");
  }
});

export type Reservation = InferSchemaType<typeof reservationSchema>;
export const ReservationModel =
  (models.Reservation as Model<Reservation>) ||
  model<Reservation>("Reservation", reservationSchema);
