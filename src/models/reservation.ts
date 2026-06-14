import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },

    source: {
      type: String,
      enum: ["WEB", "RECEPTION"],
      required: true,
    },

    packageType: {
      type: String,
      enum: ["FULL_BOARD", "ALL_INCLUSIVE"],
      required: true,
    },

    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"],
      default: "PENDING",
    },

    nightlyPrice: { type: Number, required: true },
    discountRate: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

reservationSchema.index(
  { room: 1, checkInDate: 1, checkOutDate: 1 },
  { unique: false },
);

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export { Reservation };
