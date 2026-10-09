import { Schema, model, type InferSchemaType } from "mongoose";
import { CleaningStatus, RoomType } from "@hotel-management/models";

const roomSchema = new Schema(
  {
    number: { type: String, required: true, unique: true, trim: true },
    floor: { type: Number, required: true, min: 1, max: 4 },
    type: { type: String, enum: Object.values(RoomType), required: true },
    beds: {
      single: { type: Number, required: true, min: 0, default: 0 },
      double: { type: Number, required: true, min: 0, default: 0 },
    },
    hasBalcony: { type: Boolean, default: false },
    hasMinibar: { type: Boolean, default: true },
    amenities: { type: [String], default: ["AC", "TV", "HAIR_DRYER", "WIFI"] },
    cleaningStatus: {
      type: String,
      enum: Object.values(CleaningStatus),
      default: CleaningStatus.CLEAN,
    },
  },
  { timestamps: true },
);

roomSchema.virtual("capacity").get(function () {
  return (this.beds?.single ?? 0) + (this.beds?.double ?? 0) * 2;
});

roomSchema.index({ type: 1 });

export type Room = InferSchemaType<typeof roomSchema>;
export const RoomModel = model("Room", roomSchema);
