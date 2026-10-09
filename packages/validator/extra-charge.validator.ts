import { z } from "zod";
import { ExtraChargeCategory } from "@hotel-management/models";

export function getInsertExtraChargeValidator() {
  const validator = z.object({
    reservation: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
    category: z.enum(ExtraChargeCategory),
    description: z.string().trim().min(1),
    quantity: z.number().int().min(1).optional(),
    unitPrice: z.number().min(0),
    chargedAt: z.coerce.date().optional(),
  });

  return validator;
}

export function getExtraChargeIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid extra charge id."),
  });
}

export function getUpdateExtraChargeValidator() {
  return z
    .object({
      reservation: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      category: z.enum(ExtraChargeCategory),
      description: z.string().trim().min(1),
      quantity: z.number().int().min(1),
      unitPrice: z.number().min(0),
      chargedAt: z.coerce.date(),
    })
    .partial()
    .refine((extraCharge) => Object.keys(extraCharge).length > 0, {
      message: "At least one field is required.",
    });
}

export type ExtraChargeIdParamDTO = z.infer<
  ReturnType<typeof getExtraChargeIdParamValidator>
>;
export type UpdateExtraChargeDTO = z.infer<
  ReturnType<typeof getUpdateExtraChargeValidator>
>;

export type InsertExtraChargeDTO = z.infer<
  ReturnType<typeof getInsertExtraChargeValidator>
>;
