import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const ROOM_BLOCK_REASONS = ["maintenance", "renovation", "other"] as const;

/**
 * Takes a room out of sale for maintenance. It holds the room nights like a
 * reservation but produces no revenue, so accounting is not affected.
 */
const roomBlockSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, enum: ROOM_BLOCK_REASONS, required: true, default: "maintenance" },
    note: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

roomBlockSchema.index({ room: 1, startDate: 1, endDate: 1 });

export type RoomBlock = InferSchemaType<typeof roomBlockSchema>;
export type RoomBlockDocument = HydratedDocument<RoomBlock>;

const RoomBlockModel: Model<RoomBlock> = models.RoomBlock ?? model("RoomBlock", roomBlockSchema);

export default RoomBlockModel;
