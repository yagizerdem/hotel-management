import { z } from "zod";
import { BoardType } from "@hotel-management/models";

export function getInsertDiscountRuleValidator() {
  const validator = z.object({
    boardType: z.enum(BoardType).optional(),
    minDaysInAdvance: z.number().int().min(0),
    ratePercent: z.number().min(0).max(100),
    isActive: z.boolean().optional(),
  });

  return validator;
}

export function getDiscountRuleIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid discount rule id."),
  });
}

export function getUpdateDiscountRuleValidator() {
  return z
    .object({
      boardType: z.enum(BoardType),
      minDaysInAdvance: z.number().int().min(0),
      ratePercent: z.number().min(0).max(100),
      isActive: z.boolean(),
    })
    .partial()
    .refine((discountRule) => Object.keys(discountRule).length > 0, {
      message: "At least one field is required.",
    });
}

export type DiscountRuleIdParamDTO = z.infer<
  ReturnType<typeof getDiscountRuleIdParamValidator>
>;
export type UpdateDiscountRuleDTO = z.infer<
  ReturnType<typeof getUpdateDiscountRuleValidator>
>;

export type InsertDiscountRuleDTO = z.infer<
  ReturnType<typeof getInsertDiscountRuleValidator>
>;
