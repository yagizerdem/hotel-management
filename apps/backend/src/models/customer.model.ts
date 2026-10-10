import { Schema, model, type InferSchemaType } from "mongoose";

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true },
    nationality: { type: String, default: "TR" },
    tcKimlikNo: { type: String, match: /^\d{11}$/, unique: true, sparse: true },
    isTcVerified: { type: Boolean, default: false },
    passportNo: { type: String, trim: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, lowercase: true, trim: true },
    address: { type: String, trim: true },
    marketingConsent: { type: Boolean, default: false },
  },
  { timestamps: true },
);

customerSchema.index({ lastName: 1, firstName: 1 });
customerSchema.index({ email: 1 });

export type Customer = InferSchemaType<typeof customerSchema>;
export const CustomerModel = model("Customer", customerSchema);
