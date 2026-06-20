import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { Room } from "@/src/models/room";
import { APIFeatures } from "@/src/lib/api-features";
import { Reservation } from "@/src/models/reservation";
import { AppError } from "@/src/lib/app-error";
import { Maintenance } from "@/src/models/maintenance";
import { isAfter } from "date-fns";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const queryParams: URLSearchParams = req?.nextUrl?.searchParams;

  const checkInDate = queryParams.get("checkInDate");
  const checkOutDate = queryParams.get("checkOutDate");

  if (!checkInDate || !checkOutDate) {
    throw new AppError({
      message:
        "Missing required query parameters: checkInDate and checkOutDate",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  if (isAfter(checkInDate, checkOutDate)) {
    throw new AppError({
      message: "checkInDate must be before checkOutDate",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const reservedRoomIds = (
    await Reservation.find({
      checkInDate: { $lt: new Date(checkOutDate) },
      checkOutDate: { $gt: new Date(checkInDate) },
      status: { $in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
    })
  ).map((reservation) => reservation.room.toString());

  const maintenanceRoomIds = (
    await Maintenance.find({
      startDate: { $lt: new Date(checkOutDate) },
      endDate: { $gt: new Date(checkInDate) },
      status: { $in: ["PLANNED", "ACTIVE"] },
    })
  ).map((maintenance) => maintenance.room.toString());

  const blockedRoomIds = [
    ...new Set([...reservedRoomIds, ...maintenanceRoomIds]),
  ];

  queryParams.delete("checkInDate");
  queryParams.delete("checkOutDate");

  const query = Room.find({ _id: { $nin: blockedRoomIds } });
  const apiFeatures = new APIFeatures(
    query,
    Object.fromEntries(queryParams.entries()),
  );

  const rooms = await apiFeatures
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate().mongooseQuery;

  return NextResponse.json(
    ApiResponse.ok({
      data: rooms,
      message: "Room retrieved successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const GET = withErrorHandler(handler);
