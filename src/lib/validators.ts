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

export { getRegisterSchema, getLoginSchema, validateBody };

export type { RegisterBody, LoginBody };
