import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    address: String,
    position: {
      type: String,
      enum: [
        "RECEPTIONIST",
        "CLEANER",
        "COOK",
        "WAITER",
        "ELECTRICIAN",
        "IT",
        "MANAGER",
      ],
      required: true,
    },
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

const Employee = mongoose.model("Employee", employeeSchema);

export { Employee };
