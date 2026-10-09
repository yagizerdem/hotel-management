import { Schema, model, type InferSchemaType } from "mongoose";
import { UserRole } from "@hotel-management/models";

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
    role: { type: String, enum: Object.values(UserRole), required: true },
    staff: { type: Schema.Types.ObjectId, ref: "Staff" },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);
