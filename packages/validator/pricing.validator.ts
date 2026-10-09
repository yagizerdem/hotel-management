import { z } from "zod";
import { BoardType, Currency, RoomType } from "@hotel-management/models";

export function getInsertPricingValidator() {
  const validator = z.object({
    roomType: z.enum(RoomType),
    boardType: z.enum(BoardType),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    nightlyPrice: z.number().min(0),
    currency: z.enum(Currency).optional(),
  });

  return validator;
}

export function getPricingIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid pricing id."),
  });
}

export function getUpdatePricingValidator() {
  return z
    .object({
      roomType: z.enum(RoomType),
      boardType: z.enum(BoardType),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      nightlyPrice: z.number().min(0),
      currency: z.enum(Currency),
    })
    .partial()
    .refine((pricing) => Object.keys(pricing).length > 0, {
      message: "At least one field is required.",
    });
}

export type PricingIdParamDTO = z.infer<
  ReturnType<typeof getPricingIdParamValidator>
>;
export type UpdatePricingDTO = z.infer<
  ReturnType<typeof getUpdatePricingValidator>
>;

export type InsertPricingDTO = z.infer<
  ReturnType<typeof getInsertPricingValidator>
>;
