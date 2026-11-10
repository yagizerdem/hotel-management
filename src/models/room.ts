import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const HOUSEKEEPING_STATUSES = ["clean", "dirty", "inspected"] as const;

const roomSchema = new Schema(
  {
    number: { type: String, required: true, unique: true, trim: true },
    floor: { type: Number, required: true, min: 1 },
    roomType: { type: Schema.Types.ObjectId, ref: "RoomType", required: true, index: true },
    amenities: {
      balcony: { type: Boolean, default: false },
      minibar: { type: Boolean, default: false },
      airConditioning: { type: Boolean, default: true },
      tv: { type: Boolean, default: true },
      hairDryer: { type: Boolean, default: true },
      wifi: { type: Boolean, default: true },
    },
    housekeepingStatus: { type: String, enum: HOUSEKEEPING_STATUSES, default: "clean" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type Room = InferSchemaType<typeof roomSchema>;
export type RoomDocument = HydratedDocument<Room>;

const RoomModel: Model<Room> = models.Room ?? model("Room", roomSchema);

export default RoomModel;
