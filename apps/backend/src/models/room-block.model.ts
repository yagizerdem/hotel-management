import { Schema, model, type InferSchemaType } from "mongoose";

const roomBlockSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

roomBlockSchema.pre("validate", function () {
  if (this.endDate <= this.startDate) {
    this.invalidate("endDate", "endDate must be after startDate");
  }
});

roomBlockSchema.index({ room: 1, startDate: 1, endDate: 1 });

export type RoomBlock = InferSchemaType<typeof roomBlockSchema>;
export const RoomBlockModel = model("RoomBlock", roomBlockSchema);
