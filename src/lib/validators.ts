import * as z from "zod";
import { ZodSchema } from "zod";
import { AppError } from "./app-error";
import HttpStatusCode from "./http-status-code";

const passwordRegexp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
const mongoDbObjectIdRegexp = /^[0-9a-fA-F]{24}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

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

const packageTypes = ["FULL_BOARD", "ALL_INCLUSIVE"] as const;

function getCreatePriceSchema() {
  const schema = z
    .object({
      roomType: z.string().min(1, "Room type is required"),

      packageType: z.enum(packageTypes, {
        message: "Package type must be FULL_BOARD or ALL_INCLUSIVE",
      }),

      nightlyPrice: z.number().positive("Nightly price must be greater than 0"),

      currency: z.string().default("USD"),

      validFrom: z.coerce.date({
        message: "Valid from must be a valid date",
      }),

      validTo: z.coerce.date({
        message: "Valid to must be a valid date",
      }),

      createdBy: z.string().optional(),
    })
    .refine((data) => data.validTo > data.validFrom, {
      message: "validTo must be after validFrom",
      path: ["validTo"],
    });

  return schema;
}

function getUpdatePriceSchema() {
  const schema = getCreatePriceSchema().partial();

  return schema;
}

function getCreateMaintenanceSchema() {
  const schema = z
    .object({
      room: z.string().min(1, "Room is required"),

      reason: z
        .string()
        .min(1, "Reason is required")
        .max(1000, "Reason is too long"),

      startDate: z.coerce.date({
        message: "Start date must be a valid date",
      }),

      endDate: z.coerce.date({
        message: "End date must be a valid date",
      }),

      status: z
        .enum(["PLANNED", "ACTIVE", "DONE", "CANCELLED"])
        .default("PLANNED"),

      createdBy: z.string().optional(),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    });

  return schema;
}

function getUpdateMaintenanceSchema() {
  const schema = getCreateMaintenanceSchema()
    .partial()
    .refine(
      (data) => {
        if (!data.startDate || !data.endDate) return true;
        return data.endDate > data.startDate;
      },
      {
        message: "End date must be after start date",
        path: ["endDate"],
      },
    );

  return schema;
}

function getCreateShiftSchema() {
  return z
    .object({
      employee: z
        .string()
        .regex(
          mongoDbObjectIdRegexp,
          "Employee ID must be a valid MongoDB ObjectId",
        ),

      date: z.coerce.date({
        message: "Date must be a valid date",
      }),

      startTime: z
        .string()
        .regex(timeRegex, "Start time must be in HH:mm format"),

      endTime: z.string().regex(timeRegex, "End time must be in HH:mm format"),

      isOffDay: z.boolean().default(false),

      isOvertime: z.boolean().default(false),
    })
    .refine(
      (data) => {
        if (data.isOffDay) return true;
        return data.endTime > data.startTime;
      },
      {
        message: "End time must be after start time",
        path: ["endTime"],
      },
    );
}

function getUpdateShiftSchema() {
  return getCreateShiftSchema()
    .partial()
    .refine(
      (data) => {
        if (data.isOffDay) return true;
        if (!data.startTime || !data.endTime) return true;
        return data.endTime > data.startTime;
      },
      {
        message: "End time must be after start time",
        path: ["endTime"],
      },
    );
}

function getCreateExtraExpenseSchema() {
  const schema = z.object({
    reservation: z
      .string()
      .regex(
        mongoDbObjectIdRegexp,
        "Reservation ID must be a valid MongoDB ObjectId",
      ),

    customer: z
      .string()
      .regex(
        mongoDbObjectIdRegexp,
        "Customer ID must be a valid MongoDB ObjectId",
      ),

    type: z.enum(["BAR", "SNACKBAR", "MINIBAR", "ROOM_SERVICE", "OTHER"], {
      message:
        "Type must be one of BAR, SNACKBAR, MINIBAR, ROOM_SERVICE, OTHER",
    }),

    description: z.string().trim().max(500).optional(),

    amount: z.coerce
      .number({
        message: "Amount must be a valid number",
      })
      .positive("Amount must be greater than 0"),

    currency: z.string().trim().length(3).default("USD"),

    createdBy: z
      .string()
      .regex(
        mongoDbObjectIdRegexp,
        "CreatedBy ID must be a valid MongoDB ObjectId",
      )
      .optional(),
  });
  return schema;
}

function getUpdateExtraExpenseSchema() {
  return getCreateExtraExpenseSchema().partial();
}

function getCreateGovernorReportSchema() {
  return z.object({
    reportDate: z.coerce.date({
      message: "Report date must be a valid date",
    }),

    customers: z
      .array(
        z
          .string()
          .regex(
            mongoDbObjectIdRegexp,
            "Customer ID must be a valid MongoDB ObjectId",
          ),
      )
      .default([]),

    status: z
      .enum(["PENDING", "SENT", "FAILED"], {
        message: "Status must be one of PENDING, SENT, FAILED",
      })
      .default("PENDING"),

    responseMessage: z.string().trim().max(1000).optional(),
  });
}

function getUpdateGovernorReportSchema() {
  return getCreateGovernorReportSchema().partial();
}

function getCreateCustomerSchema() {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(100, "First name cannot exceed 100 characters"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(100, "Last name cannot exceed 100 characters"),

    nationalId: z
      .string()
      .trim()
      .max(50, "National ID cannot exceed 50 characters")
      .optional(),

    passportNo: z
      .string()
      .trim()
      .max(50, "Passport number cannot exceed 50 characters")
      .optional(),

    phone: z
      .string()
      .trim()
      .max(30, "Phone number cannot exceed 30 characters")
      .optional(),

    email: z.email("Email must be a valid email address").optional(),

    address: z
      .string()
      .trim()
      .max(500, "Address cannot exceed 500 characters")
      .optional(),
  });
}

function getUpdateCustomerSchema() {
  return getCreateCustomerSchema().partial();
}

const getCreateWebReservationSchema = () =>
  z
    .object({
      room: z
        .string()
        .regex(
          mongoDbObjectIdRegexp,
          "Room ID must be a valid MongoDB ObjectId",
        ),

      packageType: z.enum(["FULL_BOARD", "ALL_INCLUSIVE"]),

      checkInDate: z.coerce.date(),
      checkOutDate: z.coerce.date(),
    })
    .refine((data) => data.checkOutDate > data.checkInDate, {
      message: "checkOutDate must be after checkInDate",
      path: ["checkOutDate"],
    });

const getCreateWebReservationBulkSchema = () =>
  z.object({
    reservations: z.array(getCreateWebReservationSchema()).refine(
      (data) => {
        const hasOverlappingReservations = data.some((reservation, index) => {
          return data.some((otherReservation, otherIndex) => {
            if (index === otherIndex) return false;
            return (
              reservation.room === otherReservation.room &&
              reservation.checkInDate < otherReservation.checkOutDate &&
              reservation.checkOutDate > otherReservation.checkInDate
            );
          });
        });
        return !hasOverlappingReservations;
      },
      {
        message: "Reservations cannot overlap for the same room",
      },
    ),
  });

const getCreateReceptionReservationSchema = () =>
  z
    .object({
      room: z
        .string()
        .regex(
          mongoDbObjectIdRegexp,
          "Room ID must be a valid MongoDB ObjectId",
        ),

      packageType: z.enum(["FULL_BOARD", "ALL_INCLUSIVE"]),

      customer: z
        .string()
        .regex(
          mongoDbObjectIdRegexp,
          "Customer ID must be a valid MongoDB ObjectId",
        ),

      checkInDate: z.coerce.date(),
      checkOutDate: z.coerce.date(),
    })
    .refine((data) => data.checkOutDate > data.checkInDate, {
      message: "checkOutDate must be after checkInDate",
      path: ["checkOutDate"],
    });

function getCreateBlogSchema() {
  return z.object({
    title: z
      .string("Title is required")
      .trim()
      .min(1, "Title is required")
      .max(200, "Title cannot exceed 200 characters"),

    content: z
      .string("Content is required")
      .trim()
      .min(1, "Content is required")
      .max(10000, "Content cannot exceed 10000 characters"),

    author: z
      .string("Author is required")
      .trim()
      .min(1, "Author is required")
      .max(100, "Author cannot exceed 100 characters"),

    publishedDate: z.coerce
      .date({
        message: "Published date must be a valid date",
      })
      .optional(),

    releaseDate: z.coerce
      .date({
        message: "Release date must be a valid date",
      })
      .optional(),

    image: z
      .file()
      .max(5 * 1024 * 1024, "Image size must be less than 5MB")
      .optional(),
  });
}

function getUpdateBlogSchema() {
  return getCreateBlogSchema().partial();
}

// wrapper for zod schema validation
function validateBody<T>(schema: ZodSchema<T>, body: unknown): T {
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new AppError({
      message: "Validation failed",
      errors: result.error.issues.map((issue) => issue.message),
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
type CreatePriceBody = z.infer<ReturnType<typeof getCreatePriceSchema>>;
type UpdatePriceBody = z.infer<ReturnType<typeof getUpdatePriceSchema>>;
type CreateMaintenanceBody = z.infer<
  ReturnType<typeof getCreateMaintenanceSchema>
>;
type UpdateMaintenanceBody = z.infer<
  ReturnType<typeof getUpdateMaintenanceSchema>
>;
type CreateShiftBody = z.infer<ReturnType<typeof getCreateShiftSchema>>;
type UpdateShiftBody = z.infer<ReturnType<typeof getUpdateShiftSchema>>;
type CreateExtraExpenseBody = z.infer<
  ReturnType<typeof getCreateExtraExpenseSchema>
>;
type UpdateExtraExpenseBody = z.infer<
  ReturnType<typeof getUpdateExtraExpenseSchema>
>;
type CreateGovernorReportBody = z.infer<
  ReturnType<typeof getCreateGovernorReportSchema>
>;
type UpdateGovernorReportBody = z.infer<
  ReturnType<typeof getUpdateGovernorReportSchema>
>;
type CreateCustomerBody = z.infer<ReturnType<typeof getCreateCustomerSchema>>;
type UpdateCustomerBody = z.infer<ReturnType<typeof getUpdateCustomerSchema>>;
type CreateWebReservationBody = z.infer<
  ReturnType<typeof getCreateWebReservationSchema>
>;
type CreateReceptionReservationBody = z.infer<
  ReturnType<typeof getCreateReceptionReservationSchema>
>;
type CreateWebReservationBulkBody = z.infer<
  ReturnType<typeof getCreateWebReservationBulkSchema>
>;

type CreateBlogBody = z.infer<ReturnType<typeof getCreateBlogSchema>>;
type UpdateBlogBody = z.infer<ReturnType<typeof getUpdateBlogSchema>>;

export {
  getRegisterSchema,
  getLoginSchema,
  getCreateRoomSchema,
  getUpdateRoomSchema,
  getCreatePriceSchema,
  getUpdatePriceSchema,
  getCreateMaintenanceSchema,
  getUpdateMaintenanceSchema,
  getCreateShiftSchema,
  getUpdateShiftSchema,
  getCreateExtraExpenseSchema,
  getUpdateExtraExpenseSchema,
  getCreateGovernorReportSchema,
  getUpdateGovernorReportSchema,
  getCreateCustomerSchema,
  getUpdateCustomerSchema,
  getCreateWebReservationSchema,
  getCreateWebReservationBulkSchema,
  getCreateReceptionReservationSchema,
  getCreateBlogSchema,
  getUpdateBlogSchema,
  validateBody,
};

export type {
  RegisterBody,
  LoginBody,
  CreateRoomBody,
  UpdateRoomBody,
  CreatePriceBody,
  UpdatePriceBody,
  CreateMaintenanceBody,
  UpdateMaintenanceBody,
  CreateShiftBody,
  UpdateShiftBody,
  CreateExtraExpenseBody,
  UpdateExtraExpenseBody,
  CreateGovernorReportBody,
  UpdateGovernorReportBody,
  CreateCustomerBody,
  UpdateCustomerBody,
  CreateWebReservationBody,
  CreateWebReservationBulkBody,
  CreateReceptionReservationBody,
  CreateBlogBody,
  UpdateBlogBody,
};
