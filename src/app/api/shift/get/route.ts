import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { APIFeatures } from "@/src/lib/api-features";
import { Shift } from "@/src/models/shift";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const query = Shift.find({});
  const queryParams = req?.nextUrl?.searchParams;
  const apiFeatures = new APIFeatures(
    query,
    Object.fromEntries(queryParams.entries()),
  );

  const shifts = await apiFeatures
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate().mongooseQuery;

  return NextResponse.json(
    ApiResponse.ok({
      data: shifts,
      message: "Shifts retrieved successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const GET = withErrorHandler(handler);
