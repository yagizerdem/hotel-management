import { z } from "zod";

export function getInsertCustomerValidator() {
  const validator = z.object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    birthDate: z.coerce.date(),
    nationality: z.string().trim().min(1).optional(),
    tcKimlikNo: z
      .string()
      .regex(/^\d{11}$/, "TC Kimlik No must be 11 digits.")
      .optional(),
    isTcVerified: z.boolean().optional(),
    passportNo: z.string().trim().min(1).optional(),
    phone: z.string().trim().min(1),
    email: z.email().optional(),
    address: z.string().trim().min(1).optional(),
    marketingConsent: z.boolean().optional(),
  });

  return validator;
}

export function getCustomerIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid customer id."),
  });
}

export function getUpdateCustomerValidator() {
  return z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      birthDate: z.coerce.date(),
      nationality: z.string().trim().min(1),
      tcKimlikNo: z
        .string()
        .regex(/^\d{11}$/, "TC Kimlik No must be 11 digits."),
      isTcVerified: z.boolean(),
      passportNo: z.string().trim().min(1),
      phone: z.string().trim().min(1),
      email: z.email(),
      address: z.string().trim().min(1),
      marketingConsent: z.boolean(),
    })
    .partial()
    .refine((customer) => Object.keys(customer).length > 0, {
      message: "At least one field is required.",
    });
}

export function getCreateProfileValidator() {
  const validator = z.object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    birthDate: z.coerce.date(),
    nationality: z.string().trim().min(1).optional(),
    tcKimlikNo: z
      .string()
      .regex(/^\d{11}$/, "TC Kimlik No must be 11 digits.")
      .optional(),
    passportNo: z.string().trim().min(1).optional(),
    phone: z.string().trim().min(1),
    email: z.email().optional(),
    address: z.string().trim().min(1).optional(),
    marketingConsent: z.boolean().optional(),
  });

  return validator;
}

export type CustomerIdParamDTO = z.infer<
  ReturnType<typeof getCustomerIdParamValidator>
>;
export type UpdateCustomerDTO = z.infer<
  ReturnType<typeof getUpdateCustomerValidator>
>;

export type InsertCustomerDTO = z.infer<
  ReturnType<typeof getInsertCustomerValidator>
>;

export type CreateProfileDTO = z.infer<
  ReturnType<typeof getCreateProfileValidator>
>;
