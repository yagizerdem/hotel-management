import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import {
  HOUSEKEEPING_STATUSES,
  ROOM_FEATURES,
  ROOM_TYPE_KEYS,
} from "./constants";

const roomSchema = new Schema(
  {
    number: { type: String, required: true, unique: true, trim: true },
    floor: { type: Number, required: true, min: 1, max: 4 },
    type: { type: String, enum: ROOM_TYPE_KEYS, required: true },
    features: [{ type: String, enum: ROOM_FEATURES }],
    housekeeping: {
      type: String,
      enum: HOUSEKEEPING_STATUSES,
      default: "clean",
    },
  },
  { timestamps: true },
);

roomSchema.index({ type: 1 });

export type Room = InferSchemaType<typeof roomSchema>;
export const RoomModel =
  (models.Room as Model<Room>) || model<Room>("Room", roomSchema);
