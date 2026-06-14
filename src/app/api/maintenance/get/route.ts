import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { APIFeatures } from "@/src/lib/api-features";
import { Maintenance } from "@/src/models/maintenance";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const query = Maintenance.find({});
  const queryParams = req?.nextUrl?.searchParams;
  const apiFeatures = new APIFeatures(
    query,
    Object.fromEntries(queryParams.entries()),
  );

  const maintenances = await apiFeatures
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate().mongooseQuery;

  return NextResponse.json(
    ApiResponse.ok({
      data: maintenances,
      message: "Maintenance retrieved successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const GET = withErrorHandler(handler);
