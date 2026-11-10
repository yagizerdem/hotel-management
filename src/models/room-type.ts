import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

const roomTypeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    capacity: { type: Number, required: true, min: 1 },
    beds: {
      single: { type: Number, required: true, min: 0, default: 0 },
      double: { type: Number, required: true, min: 0, default: 0 },
    },
    images: { type: [String], default: [] },
  },
  { timestamps: true },
);

export type RoomType = InferSchemaType<typeof roomTypeSchema>;
export type RoomTypeDocument = HydratedDocument<RoomType>;

const RoomTypeModel: Model<RoomType> = models.RoomType ?? model("RoomType", roomTypeSchema);

export default RoomTypeModel;
