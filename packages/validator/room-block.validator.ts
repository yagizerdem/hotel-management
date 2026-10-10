import { z } from "zod";

export function getInsertRoomBlockValidator() {
  const validator = z.object({
    room: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    reason: z.string().trim().min(1),
  });

  return validator;
}

export function getRoomBlockIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid room block id."),
  });
}

export function getUpdateRoomBlockValidator() {
  return z
    .object({
      room: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      reason: z.string().trim().min(1),
    })
    .partial()
    .refine((roomBlock) => Object.keys(roomBlock).length > 0, {
      message: "At least one field is required.",
    });
}

export function ISOTimeStringValidator() {
  return z.string().datetime();
}

export type RoomBlockIdParamDTO = z.infer<
  ReturnType<typeof getRoomBlockIdParamValidator>
>;
export type UpdateRoomBlockDTO = z.infer<
  ReturnType<typeof getUpdateRoomBlockValidator>
>;

export type InsertRoomBlockDTO = z.infer<
  ReturnType<typeof getInsertRoomBlockValidator>
>;
