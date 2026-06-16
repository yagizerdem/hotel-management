import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalId: { type: String, unique: true, required: true },
    passportNo: { type: String, unique: true },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export { Customer };
