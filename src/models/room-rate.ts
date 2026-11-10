import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const BOARD_TYPES = ["full_board", "all_inclusive"] as const;
export type BoardType = (typeof BOARD_TYPES)[number];

/**
 * Nightly price of a room type and board type for a date range.
 * Managers set these about four months ahead.
 */
const roomRateSchema = new Schema(
  {
    roomType: { type: Schema.Types.ObjectId, ref: "RoomType", required: true },
    boardType: { type: String, enum: BOARD_TYPES, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    nightlyPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, default: "TRY" },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true },
);

roomRateSchema.index({ roomType: 1, boardType: 1, validFrom: 1 });

export type RoomRate = InferSchemaType<typeof roomRateSchema>;
export type RoomRateDocument = HydratedDocument<RoomRate>;

const RoomRateModel: Model<RoomRate> = models.RoomRate ?? model("RoomRate", roomRateSchema);

export default RoomRateModel;
