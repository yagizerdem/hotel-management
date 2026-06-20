import {
  validateBody,
  CreateWebReservationBulkBody,
  getCreateWebReservationBulkSchema,
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
import { ensureCustomerExistByUserId } from "@/src/service/customer-service";
import { createReservationBulk } from "@/src/service/reservation-service";
import { ReservationDocument } from "@/src/models/reservation";

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

  const validated = validateBody<CreateWebReservationBulkBody>(
    getCreateWebReservationBulkSchema(),
    body,
  );

  const reservationsData: ReservationDocument[] = [];

  for (let reservation of body.reservations) {
    reservation.source = "WEB";
    reservation.customer = customer?._id; // customer that reserves the room
    reservation.createdBy = _id; // user id
    reservation.status = "PENDING"; // default status is pending when customer creates reservation

    reservationsData.push(reservation as ReservationDocument);
  }

  const response = await createReservationBulk(reservationsData);

  return NextResponse.json(
    ApiResponse.created({
      data: response,
      message: "Reservations created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
