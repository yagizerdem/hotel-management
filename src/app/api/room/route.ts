import { withHttpErrorHandler } from "@error/with-error-handler";
import { ApiResponse } from "@lib/api-response";
import dbConnect from "@lib/db";
import { getRooms } from "@service/room-service";
import { NextResponse } from "next/server";

export const GET = withHttpErrorHandler(async (req) => {
  await dbConnect();
  const rooms = await getRooms(req.nextUrl.searchParams);

  const body = ApiResponse.ok(rooms);
  return NextResponse.json(body, { status: body.httpStatusCode });
});
