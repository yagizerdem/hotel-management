import { InferSchemaType, Model, Schema, model, models } from "mongoose";

// A room taken out of sale for maintenance. It is not a rental, so it
// never counts toward accounting.
const roomBlockSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

roomBlockSchema.index({ room: 1, startDate: 1, endDate: 1 });

roomBlockSchema.pre("validate", function () {
  if (this.endDate <= this.startDate) {
    this.invalidate("endDate", "endDate must be after startDate");
  }
});

export type RoomBlock = InferSchemaType<typeof roomBlockSchema>;
export const RoomBlockModel =
  (models.RoomBlock as Model<RoomBlock>) ||
  model<RoomBlock>("RoomBlock", roomBlockSchema);
