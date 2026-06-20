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
import { stripe } from "@/src/lib/stripe-wrapper";

export interface CreateWebReservationBulkBodyResponse {
  reservations: ReservationDocument[];
  checkoutUrl: string;
  sessionId: string;
}

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

  const totalPrice = response.reduce(
    (acc, reservation) => acc + reservation.totalPrice,
    0,
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Room Reservation #${response.map((r) => r._id).join(", ")}`, // reservation ids as product name
          },
          unit_amount: totalPrice * 100, // usd
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/reservation/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/reservation/cancel`,

    metadata: {
      reservationIds: response.map((r) => r._id.toString()).join(", "),
      userId: _id!.toString(),
      customerId: customer._id.toString(),
    },
  });

  return NextResponse.json(
    ApiResponse.created({
      data: {
        reservations: response,
        checkoutUrl: session.url,
        sessionId: session.id,
      },
      message: "Reservations created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
