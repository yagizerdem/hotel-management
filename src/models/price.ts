import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    roomType: { type: String, required: true },
    packageType: {
      type: String,
      enum: ["FULL_BOARD", "ALL_INCLUSIVE"],
      required: true,
    },
    nightlyPrice: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Price = mongoose.model("Price", priceSchema);

export { Price };
