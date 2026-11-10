import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { BOARD_TYPES, CURRENCIES, ROOM_TYPE_KEYS } from "./constants";

// Nightly price for a room type and board type, set by managers per season
const roomPriceSchema = new Schema(
  {
    roomType: { type: String, enum: ROOM_TYPE_KEYS, required: true },
    boardType: { type: String, enum: BOARD_TYPES, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    nightlyPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: CURRENCIES, default: "TRY" },
  },
  { timestamps: true },
);

roomPriceSchema.index({ roomType: 1, boardType: 1, startDate: 1, endDate: 1 });

roomPriceSchema.pre("validate", function () {
  if (this.endDate <= this.startDate) {
    this.invalidate("endDate", "endDate must be after startDate");
  }
});

export type RoomPrice = InferSchemaType<typeof roomPriceSchema>;
export const RoomPriceModel =
  (models.RoomPrice as Model<RoomPrice>) ||
  model<RoomPrice>("RoomPrice", roomPriceSchema);
