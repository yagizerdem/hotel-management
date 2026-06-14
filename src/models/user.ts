import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
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
        "IT_ADMIN",
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
