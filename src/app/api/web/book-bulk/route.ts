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

  validateBody<CreateWebReservationBulkBody>(
    getCreateWebReservationBulkSchema(),
    body,
  );

  for (let reservation of body.reservations) {
    reservation.source = "WEB";
    reservation.customer = customer?._id; // customer that reserves the room
    reservation.createdBy = _id; // user id
    reservation.status = "PENDING"; // default status is pending when customer creates reservation
  }

  // const reservation = await createReservation(body as ReservationDocument);

  return NextResponse.json(
    ApiResponse.created({
      data: null,
      message: "Reservations created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
