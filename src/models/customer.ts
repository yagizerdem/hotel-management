import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const customerSchema = new Schema(
  {
    // Set for customers who registered on the website
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    // T.C. kimlik no, looked up from the civil registry when missing on the ID
    nationalId: { type: String, match: /^\d{11}$/, unique: true, sparse: true },
    passportNo: { type: String, trim: true },
    nationality: { type: String, trim: true, default: "TR" },
    birthDate: Date,
    phone: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    address: { type: String, trim: true },
  },
  { timestamps: true },
);

customerSchema.pre("validate", function () {
  if (!this.nationalId && !this.passportNo) {
    this.invalidate("nationalId", "nationalId or passportNo is required");
  }
});

export type Customer = InferSchemaType<typeof customerSchema>;
export const CustomerModel =
  (models.Customer as Model<Customer>) ||
  model<Customer>("Customer", customerSchema);
