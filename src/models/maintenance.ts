import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    reason: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PLANNED", "ACTIVE", "DONE", "CANCELLED"],
      default: "PLANNED",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

maintenanceSchema.index(
  { room: 1, startDate: 1, endDate: 1 },
  { unique: false },
);

const Maintenance =
  mongoose.models.Maintenance ||
  mongoose.model("Maintenance", maintenanceSchema);

export { Maintenance };
