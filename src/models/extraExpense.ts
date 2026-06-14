import mongoose from "mongoose";

const extraExpenseSchema = new mongoose.Schema(
  {
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    type: {
      type: String,
      enum: ["BAR", "SNACKBAR", "MINIBAR", "ROOM_SERVICE", "OTHER"],
      required: true,
    },
    description: String,
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const ExtraExpense = mongoose.model("ExtraExpense", extraExpenseSchema);

export { ExtraExpense };
