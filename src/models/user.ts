import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  username: string;
  email?: string;
  password: string;
  role:
    | "ADMIN"
    | "CUSTOMER"
    | "RECEPTIONIST"
    | "MANAGER"
    | "HR_MANAGER"
    | "SALES_MANAGER"
    | "IT_SUPPORT"
    | "CLEANER"
    | "COOK"
    | "WAITER"
    | "ELECTRICIAN";
  isActive: boolean;
}

interface IUserCredentials {
  username: string;
  email: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "ADMIN",
        "CUSTOMER",
        "RECEPTIONIST",
        "MANAGER",
        "HR_MANAGER",
        "SALES_MANAGER",
        "IT_SUPPORT",
        "CLEANER",
        "COOK",
        "WAITER",
        "ELECTRICIAN",
      ],
      default: "CUSTOMER",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    methods: {
      comparePassword: async function (password: string) {
        return bcrypt.compare(password, this.password);
      },
    },
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };

export type { IUser, IUserCredentials };
