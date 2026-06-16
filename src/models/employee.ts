import mongoose from "mongoose";
import { required } from "zod/mini";

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    address: String,
    // position: {
    //   type: String,
    //   enum: [
    //     "CLEANER",
    //     "COOK",
    //     "WAITER",
    //     "ELECTRICIAN",
    //     "IT",
    //     "ADMIN",
    //     "RECEPTIONIST",
    //     "MANAGER",
    //     "HR_MANAGER",
    //     "SALES_MANAGER",
    //     "IT_ADMIN",
    //   ],
    //   required: true,
    // },
    salaryType: {
      type: String,
      enum: ["HOURLY", "MONTHLY"],
      required: true,
    },
    hourlyRate: Number,
    monthlySalary: Number,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export { Employee };
