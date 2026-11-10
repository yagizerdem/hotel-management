import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { USER_ROLES } from "./constants";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, default: "customer", required: true },
    // Customers who agree to hear about campaigns and events
    campaignConsent: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel =
  (models.User as Model<User>) || model<User>("User", userSchema);
