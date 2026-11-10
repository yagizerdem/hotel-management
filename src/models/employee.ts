import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

export const EMPLOYEE_POSITIONS = [
  "receptionist",
  "housekeeper",
  "cook",
  "waiter",
  "electrician",
  "it_specialist",
  "manager",
] as const;

// Managers get a monthly salary; everyone else is paid by the hour.
export const PAY_TYPES = ["hourly", "monthly"] as const;

const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    nationalId: { type: String, trim: true, match: /^\d{11}$/ },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    position: { type: String, enum: EMPLOYEE_POSITIONS, required: true },
    payType: { type: String, enum: PAY_TYPES, required: true, default: "hourly" },
    hourlyWage: {
      type: Number,
      min: 0,
      required: function (this: { payType: string }) {
        return this.payType === "hourly";
      },
    },
    monthlySalary: {
      type: Number,
      min: 0,
      required: function (this: { payType: string }) {
        return this.payType === "monthly";
      },
    },
    currency: { type: String, required: true, uppercase: true, default: "TRY" },
    // Weekly day off, 0 = Sunday ... 6 = Saturday.
    weeklyDayOff: { type: Number, min: 0, max: 6 },
    hiredAt: { type: Date, required: true, default: Date.now },
    leftAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

employeeSchema.index(
  { nationalId: 1 },
  { unique: true, partialFilterExpression: { nationalId: { $type: "string" } } },
);
employeeSchema.index({ position: 1, isActive: 1 });

export type Employee = InferSchemaType<typeof employeeSchema>;
export type EmployeeDocument = HydratedDocument<Employee>;

const EmployeeModel: Model<Employee> = models.Employee ?? model("Employee", employeeSchema);

export default EmployeeModel;
