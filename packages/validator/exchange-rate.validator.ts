import { z } from "zod";
import { Currency } from "@hotel-management/models";

export function getInsertExchangeRateValidator() {
  const validator = z.object({
    date: z.coerce.date(),
    currency: z.enum(Currency),
    buyRate: z.number().min(0),
    sellRate: z.number().min(0),
    source: z.string().trim().min(1).optional(),
  });

  return validator;
}

export function getExchangeRateIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid exchange rate id."),
  });
}

export function getUpdateExchangeRateValidator() {
  return z
    .object({
      date: z.coerce.date(),
      currency: z.enum(Currency),
      buyRate: z.number().min(0),
      sellRate: z.number().min(0),
      source: z.string().trim().min(1),
    })
    .partial()
    .refine((exchangeRate) => Object.keys(exchangeRate).length > 0, {
      message: "At least one field is required.",
    });
}

export type ExchangeRateIdParamDTO = z.infer<
  ReturnType<typeof getExchangeRateIdParamValidator>
>;
export type UpdateExchangeRateDTO = z.infer<
  ReturnType<typeof getUpdateExchangeRateValidator>
>;

export type InsertExchangeRateDTO = z.infer<
  ReturnType<typeof getInsertExchangeRateValidator>
>;
