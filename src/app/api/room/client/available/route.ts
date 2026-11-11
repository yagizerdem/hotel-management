import { withHttpErrorHandler } from "@error/with-error-handler";
import { ApiResponse } from "@lib/api-response";
import dbConnect from "@lib/db";
import { getAvailableRooms } from "@service/room-service";
import { NextResponse } from "next/server";

/**
 * GET /api/room/client/available?checkIn=2026-12-01&checkOut=2026-12-05&guests=2&boardType=all_inclusive
 *
 * Rooms that are free for the stay and sleep the guests, with the stay's
 * price. Other room fields (floor, amenities.balcony) filter, and limit and
 * skip page the results.
 */
export const GET = withHttpErrorHandler(async (req) => {
  await dbConnect();
  const rooms = await getAvailableRooms(req.nextUrl.searchParams);

  const body = ApiResponse.ok(rooms);
  return NextResponse.json(body, { status: body.httpStatusCode });
});
