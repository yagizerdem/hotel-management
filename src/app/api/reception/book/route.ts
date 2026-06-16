import {
  validateBody,
  CreateReceptionReservationBody,
  getCreateReceptionReservationSchema,
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

  // ensure role is receptionist
  authorizeRole({
    allowedRolesMask: toRoleMask({ role: "RECEPTIONIST" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to reserve room",
  });

  const body = await req.json();

  validateBody<CreateReceptionReservationBody>(
    getCreateReceptionReservationSchema(),
    body,
  );

  body.source = "RECEPTION";
  body.createdBy = _id; // user id
  body.status = "CHECKED_IN"; // directly check in when receptionist creates reservation

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
