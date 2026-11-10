import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const ROOM_NIGHT_KINDS = ["reservation", "block"] as const;

/**
 * One document per room per night. The unique index on (room, night) lets
 * the database reject a second booking of the same night, so a web booking
 * and a reception booking can never take the same room at once.
 */
const roomNightSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    // Calendar date of the night, stored as midnight UTC.
    night: { type: Date, required: true },
    kind: { type: String, enum: ROOM_NIGHT_KINDS, required: true },
    reservation: { type: Schema.Types.ObjectId, ref: "Reservation" },
    block: { type: Schema.Types.ObjectId, ref: "RoomBlock" },
  },
  { timestamps: true },
);

roomNightSchema.index({ room: 1, night: 1 }, { unique: true });
roomNightSchema.index({ night: 1, kind: 1 });
roomNightSchema.index({ reservation: 1 });
roomNightSchema.index({ block: 1 });

export type RoomNight = InferSchemaType<typeof roomNightSchema>;
export type RoomNightDocument = HydratedDocument<RoomNight>;

const RoomNightModel: Model<RoomNight> = models.RoomNight ?? model("RoomNight", roomNightSchema);

export default RoomNightModel;
