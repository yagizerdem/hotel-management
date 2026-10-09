import { Schema, model, type InferSchemaType, type Types } from "mongoose";
import {
  BoardType,
  Currency,
  ReservationSource,
  ReservationStatus,
} from "./enums.js";

const guestSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date },
    nationality: { type: String, default: "TR" },
    tcKimlikNo: { type: String, match: /^\d{11}$/ },
    passportNo: { type: String, trim: true },
  },
  { _id: false },
);

const reservationSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    guests: { type: [guestSchema], default: [] },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    boardType: { type: String, enum: Object.values(BoardType), required: true },
    source: {
      type: String,
      enum: Object.values(ReservationSource),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ReservationStatus),
      default: ReservationStatus.CONFIRMED,
    },
    currency: {
      type: String,
      enum: Object.values(Currency),
      default: Currency.TRY,
    },
    nights: { type: Number, required: true, min: 1 },
    nightlyPrice: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    totalPrice: { type: Number, required: true, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

reservationSchema.pre("validate", function () {
  if (this.checkOutDate <= this.checkInDate) {
    this.invalidate("checkOutDate", "checkOutDate must be after checkInDate");
  }
});

reservationSchema.index({ room: 1, checkInDate: 1, checkOutDate: 1 });
reservationSchema.index({ customer: 1 });
reservationSchema.index({ status: 1, checkInDate: 1 });

export type Reservation = InferSchemaType<typeof reservationSchema>;
export const ReservationModel = model("Reservation", reservationSchema);

const ACTIVE_STATUSES = [
  ReservationStatus.PENDING,
  ReservationStatus.CONFIRMED,
  ReservationStatus.CHECKED_IN,
];

export async function hasReservationConflict(
  roomId: Types.ObjectId | string,
  checkInDate: Date,
  checkOutDate: Date,
  excludeReservationId?: Types.ObjectId | string,
): Promise<boolean> {
  const filter: Record<string, unknown> = {
    room: roomId,
    status: { $in: ACTIVE_STATUSES },
    checkInDate: { $lt: checkOutDate },
    checkOutDate: { $gt: checkInDate },
  };
  if (excludeReservationId) filter._id = { $ne: excludeReservationId };
  return (await ReservationModel.exists(filter)) !== null;
}
