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
import { createReservation } from "@/src/service/reservation-service";
import {
  ensureCustomerExistById,
  ensureCustomerExistByUserId,
} from "@/src/service/customer-service";
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
    allowedRolesMask: toRoleMask({ role: "CUSTOMER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to reserve room",
  });

  const customer = await ensureCustomerExistByUserId(_id!);

  const body = await req.json();

  validateBody<CreateWebReservationBody>(getCreateWebReservationSchema(), body);

  body.source = "WEB";
  body.customer = customer?._id; // customer that reserves the room
  body.createdBy = _id; // user id
  body.status = "PENDING"; // default status is pending when customer creates reservation

  const reservation = await createReservation(body as ReservationDocument);

  return NextResponse.json(
    ApiResponse.created({
      data: reservation,
      message: "Reservation created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
