import { z } from "zod";
import { ShiftType } from "@hotel-management/models";

export function getInsertShiftValidator() {
  const validator = z.object({
    staff: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
    date: z.coerce.date(),
    type: z.enum(ShiftType),
    startsAt: z.coerce.date().optional(),
    endsAt: z.coerce.date().optional(),
    overtimeHours: z.number().min(0).optional(),
  });

  return validator;
}

export function getShiftIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid shift id."),
  });
}

export function getUpdateShiftValidator() {
  return z
    .object({
      staff: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      date: z.coerce.date(),
      type: z.enum(ShiftType),
      startsAt: z.coerce.date(),
      endsAt: z.coerce.date(),
      overtimeHours: z.number().min(0),
    })
    .partial()
    .refine((shift) => Object.keys(shift).length > 0, {
      message: "At least one field is required.",
    });
}

export type ShiftIdParamDTO = z.infer<
  ReturnType<typeof getShiftIdParamValidator>
>;
export type UpdateShiftDTO = z.infer<
  ReturnType<typeof getUpdateShiftValidator>
>;

export type InsertShiftDTO = z.infer<
  ReturnType<typeof getInsertShiftValidator>
>;
