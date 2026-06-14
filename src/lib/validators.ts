import * as z from "zod";
import { ZodSchema } from "zod";
import { AppError } from "./app-error";
import HttpStatusCode from "./http-status-code";

const passwordRegexp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;

function getRegisterSchema() {
  const schema = z.object({
    username: z
      .string("username is required")
      .trim()
      .min(3, "username must be at least 3 characters")
      .max(30, "username must be at most 30 characters"),

    email: z.email("Invalid email address").trim().toLowerCase(),

    password: z
      .string("password is required")
      .min(6, "password must be at least 6 characters")
      .max(100, "password must be at most 100 characters")
      .regex(
        passwordRegexp,
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
  });

  return schema;
}

function getLoginSchema() {
  const schema = z.object({
    email: z.email("Invalid email address").trim().toLowerCase(),

    password: z.string("password is required").min(1, "password is required"),
  });

  return schema;
}

const roomTypes = [
  "SINGLE",
  "DOUBLE_TWIN",
  "DOUBLE_DUBLE",
  "TRIPLE_SINGLE",
  "TRIPLE_MIXED",
  "QUAD",
  "KING_SUITE",
] as const;

const roomStatuses = [
  "AVAILABLE",
  "OCCUPIED",
  "RESERVED",
  "MAINTENANCE",
  "CLEANING",
] as const;

function getCreateRoomSchema() {
  const schema = z.object({
    floor: z
      .number("floor is required")
      .int("floor must be an integer")
      .min(1, "floor must be at least 1")
      .max(4, "floor must be at most 4"),

    number: z
      .string("room number is required")
      .trim()
      .min(1, "room number is required")
      .max(20, "room number must be at most 20 characters"),

    type: z.enum(roomTypes, "invalid room type"),

    capacity: z
      .number("capacity is required")
      .int("capacity must be an integer")
      .min(1, "capacity must be at least 1")
      .max(10, "capacity must be at most 10"),

    beds: z
      .object({
        single: z.number().int().min(0).default(0),
        double: z.number().int().min(0).default(0),
      })
      .optional(),

    hasBalcony: z.boolean().optional(),
    hasMinibar: z.boolean().optional(),
    hasAirConditioner: z.boolean().optional(),
    hasTv: z.boolean().optional(),
    hasHairDryer: z.boolean().optional(),
    hasWifi: z.boolean().optional(),

    status: z.enum(roomStatuses, "invalid room status").optional(),
    isActive: z.boolean().optional(),
  });

  return schema;
}

function getUpdateRoomSchema() {
  const schema = getCreateRoomSchema().partial();

  return schema;
}

// wrapper for zod schema validation
function validateBody<T>(schema: ZodSchema<T>, body: unknown): T {
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new AppError({
      message: result.error.issues[0]?.message ?? "Validation failed",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  return result.data;
}

type RegisterBody = z.infer<ReturnType<typeof getRegisterSchema>>;
type LoginBody = z.infer<ReturnType<typeof getLoginSchema>>;
type CreateRoomBody = z.infer<ReturnType<typeof getCreateRoomSchema>>;
type UpdateRoomBody = z.infer<ReturnType<typeof getUpdateRoomSchema>>;

export {
  getRegisterSchema,
  getLoginSchema,
  getCreateRoomSchema,
  getUpdateRoomSchema,
  validateBody,
};

export type { RegisterBody, LoginBody, CreateRoomBody, UpdateRoomBody };
