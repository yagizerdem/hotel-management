import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // "08:00"
    endTime: { type: String, required: true }, // "16:00"
    isOffDay: { type: Boolean, default: false },
    isOvertime: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Shift = mongoose.models.Shift || mongoose.model("Shift", shiftSchema);

export { Shift };
