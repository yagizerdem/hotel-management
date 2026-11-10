import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const USER_ROLES = ["customer", "receptionist", "manager", "it_admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, required: true, default: "customer" },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    // Verified accounts keep fake web reservations out.
    emailVerifiedAt: { type: Date },
    // Customers who agree to hear about seasonal campaigns and events.
    marketingOptIn: { type: Boolean, default: false },
    guest: { type: Schema.Types.ObjectId, ref: "Guest" },
    employee: { type: Schema.Types.ObjectId, ref: "Employee" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

const UserModel: Model<User> = models.User ?? model("User", userSchema);

export default UserModel;
