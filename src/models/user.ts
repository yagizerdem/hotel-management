const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
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
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export { User };
