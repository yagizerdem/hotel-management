import {
  validateBody,
  CreateWebReservationBody,
  getCreateWebReservationSchema,
} from "@/src/lib/validators";
import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { AppError } from "@/src/lib/app-error";
import { headers } from "next/headers";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import { calculateExpense } from "@/src/service/reservation-service";
import type { ReservationDocument } from "@/src/models/reservation";

async function handler(req: NextRequest) {
  await dbConnect();

  const headerList = await headers();
  const email = headerList.get("x-user-email");
  const userFromDb = await ensureUserExistByEmail(email!);
  const role = userFromDb?.role ?? "";

  const _id = userFromDb?._id;

  if (!role) {
    throw new AppError({
      message: "Role is required",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  // ensure role is customer
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "CUSTOMER" }) |
      toRoleMask({ role: "ADMIN" }) |
      toRoleMask({ role: "MANAGER" }) |
      toRoleMask({ role: "RECEPTIONIST" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to get reservation price",
  });

  const body = await req.json();

  validateBody<CreateWebReservationBody>(getCreateWebReservationSchema(), body);

  const expense = await calculateExpense(body as ReservationDocument);

  return NextResponse.json(
    ApiResponse.ok({
      data: expense,
      message: "Successfully calculated reservation price",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const POST = withErrorHandler(handler);
