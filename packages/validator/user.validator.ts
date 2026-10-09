import { z } from "zod";
import { UserRole } from "@hotel-management/models";

const passwordRegx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function getInsertUserValidator() {
  const validator = z.object({
    email: z.email(),
    password: z.string().regex(passwordRegx, {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    role: z.enum(UserRole),
    staff: z
      .string()
      .regex(/^[a-f\d]{24}$/i, "Invalid id.")
      .optional(),
    customer: z
      .string()
      .regex(/^[a-f\d]{24}$/i, "Invalid id.")
      .optional(),
    isActive: z.boolean().optional(),
  });

  return validator;
}

export function getUserIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user id."),
  });
}

export function getUpdateUserValidator() {
  return z
    .object({
      email: z.email(),
      password: z.string().regex(passwordRegx, {
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
      role: z.enum(UserRole),
      staff: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      customer: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      isActive: z.boolean(),
    })
    .partial()
    .refine((user) => Object.keys(user).length > 0, {
      message: "At least one field is required.",
    });
}

export type UserIdParamDTO = z.infer<
  ReturnType<typeof getUserIdParamValidator>
>;
export type UpdateUserDTO = z.infer<ReturnType<typeof getUpdateUserValidator>>;

export type InsertUserDTO = z.infer<ReturnType<typeof getInsertUserValidator>>;
