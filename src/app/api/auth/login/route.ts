import { getLoginSchema, validateBody, LoginBody } from "@/src/lib/validators";
import { generateJwtToken } from "@/src/lib/jwt-util";
import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import { AppError } from "@/src/lib/app-error";
import { cookies } from "next/headers";

async function handler(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const loginData = validateBody<LoginBody>(getLoginSchema(), body);

  const userFromDb = await ensureUserExistByEmail(loginData.email);
  const isPasswordValid = await userFromDb.comparePassword(loginData.password);

  if (!isPasswordValid) {
    throw new AppError({
      message: "Invalid password",
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }

  const token = generateJwtToken({
    _id: userFromDb._id.toString(),
    username: userFromDb.username,
    email: userFromDb.email || "",
    role: userFromDb.role,
  });

  if (token) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "jwt",
      value: token,
    });
  }

  return NextResponse.json(
    ApiResponse.created({
      data: {
        token,
        email: userFromDb.email,
        username: userFromDb.username,
        role: userFromDb.role,
      },
      message: "User logged in successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
