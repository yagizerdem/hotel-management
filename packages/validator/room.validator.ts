import { z } from "zod";
import { RoomType, CleaningStatus } from "@hotel-management/models";

export function getInsertRoomValidator() {
  const validator = z.object({
    number: z.string().trim().min(1),
    floor: z.number().int().min(1).max(4),
    type: z.enum(RoomType),
    beds: z
      .object({
        single: z.number().int().min(0),
        double: z.number().int().min(0),
      })
      .refine((beds) => beds.single + beds.double > 0, {
        message: "Room must have at least one bed.",
      }),
    hasBalcony: z.boolean().optional(),
    hasMinibar: z.boolean().optional(),
    amenities: z.array(z.string().trim().min(1)).optional(),
    cleaningStatus: z.enum(CleaningStatus).optional(),
  });

  return validator;
}

export function getRoomIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid room id."),
  });
}

export function getUpdateRoomValidator() {
  return z
    .object({
      number: z.string().trim().min(1),
      floor: z.number().int().min(1).max(4),
      type: z.enum(RoomType),
      beds: z
        .object({
          single: z.number().int().min(0),
          double: z.number().int().min(0),
        })
        .refine((beds) => beds.single + beds.double > 0, {
          message: "Room must have at least one bed.",
        }),
      hasBalcony: z.boolean(),
      hasMinibar: z.boolean(),
      amenities: z.array(z.string().trim().min(1)),
      cleaningStatus: z.enum(CleaningStatus),
    })
    .partial()
    .refine((room) => Object.keys(room).length > 0, {
      message: "At least one field is required.",
    });
}

export type RoomIdParamDTO = z.infer<
  ReturnType<typeof getRoomIdParamValidator>
>;
export type UpdateRoomDTO = z.infer<ReturnType<typeof getUpdateRoomValidator>>;

export type InsertRoomDTO = z.infer<ReturnType<typeof getInsertRoomValidator>>;
