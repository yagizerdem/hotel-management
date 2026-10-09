import { z } from "zod";
import { PayType } from "@hotel-management/models";

export function getInsertStaffValidator() {
  const validator = z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    tcKimlikNo: z.string().regex(/^\d{11}$/, "TC Kimlik No must be 11 digits."),
    phone: z.string().trim().min(1).optional(),
    address: z.string().trim().min(1).optional(),
    payType: z.enum(PayType),
    hourlyWage: z.number().min(0).optional(),
    monthlySalary: z.number().min(0).optional(),
    hireDate: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
  });

  return validator;
}

export function getStaffIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid staff id."),
  });
}

export function getUpdateStaffValidator() {
  return z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      tcKimlikNo: z
        .string()
        .regex(/^\d{11}$/, "TC Kimlik No must be 11 digits."),
      phone: z.string().trim().min(1),
      address: z.string().trim().min(1),
      payType: z.enum(PayType),
      hourlyWage: z.number().min(0),
      monthlySalary: z.number().min(0),
      hireDate: z.coerce.date(),
      isActive: z.boolean(),
    })
    .partial()
    .refine((staff) => Object.keys(staff).length > 0, {
      message: "At least one field is required.",
    });
}

export type StaffIdParamDTO = z.infer<
  ReturnType<typeof getStaffIdParamValidator>
>;
export type UpdateStaffDTO = z.infer<
  ReturnType<typeof getUpdateStaffValidator>
>;

export type InsertStaffDTO = z.infer<
  ReturnType<typeof getInsertStaffValidator>
>;
