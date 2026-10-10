import { z } from "zod";
import {
  BoardType,
  Currency,
  ReservationSource,
  ReservationStatus,
} from "@hotel-management/models";

const guestValidator = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  birthDate: z.string().datetime().optional(),
  nationality: z.string().trim().min(1).default("TR"),
  tcKimlikNo: z
    .string()
    .regex(/^\d{11}$/, "TC Kimlik No must be 11 digits.")
    .optional(),
  passportNo: z.string().trim().min(1).optional(),
});

export function getInsertReservationValidator() {
  const validator = z.object({
    customer: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
    room: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
    guests: z.array(guestValidator).optional(),
    checkInDate: z.string().datetime(),
    checkOutDate: z.string().datetime(),
    boardType: z.enum(BoardType),
    source: z.enum(ReservationSource),
    status: z.enum(ReservationStatus).optional(),
    currency: z.enum(Currency).optional(),
    nights: z.number().int().min(1),
    nightlyPrice: z.number().min(0),
    discountPercent: z.number().min(0).max(100).optional(),
    totalPrice: z.number().min(0),
  });

  return validator;
}

export function getReservationIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid reservation id."),
  });
}

export function getUpdateReservationValidator() {
  return z
    .object({
      customer: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      room: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
      guests: z.array(guestValidator),
      checkInDate: z.coerce.date(),
      checkOutDate: z.coerce.date(),
      boardType: z.enum(BoardType),
      source: z.enum(ReservationSource),
      status: z.enum(ReservationStatus),
      currency: z.enum(Currency),
      nights: z.number().int().min(1),
      nightlyPrice: z.number().min(0),
      discountPercent: z.number().min(0).max(100),
      totalPrice: z.number().min(0),
    })
    .partial()
    .refine((reservation) => Object.keys(reservation).length > 0, {
      message: "At least one field is required.",
    });
}

export function getCreateReservationWebValidator() {
  const validator = z.object({
    room: z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."),
    checkInDate: z.string().datetime(),
    checkOutDate: z.string().datetime(),
    boardType: z.enum(BoardType),
    currency: z.enum(Currency).optional().default(Currency.USD),
  });

  return validator;
}

export type ReservationIdParamDTO = z.infer<
  ReturnType<typeof getReservationIdParamValidator>
>;
export type UpdateReservationDTO = z.infer<
  ReturnType<typeof getUpdateReservationValidator>
>;

export type InsertReservationDTO = z.infer<
  ReturnType<typeof getInsertReservationValidator>
>;

export type CreateReservationWebDTO = z.infer<
  ReturnType<typeof getCreateReservationWebValidator>
>;
