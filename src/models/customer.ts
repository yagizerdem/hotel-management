import mongoose, { Types } from "mongoose";

interface ICustomer {
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  nationalId: string;
  passportNo?: string;
  phone: string;
  address: string;
}

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
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export { Customer };

export type { ICustomer };
