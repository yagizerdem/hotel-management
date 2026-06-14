import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { APIFeatures } from "@/src/lib/api-features";
import { Price } from "@/src/models/price";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const query = Price.find({});
  const queryParams = req?.nextUrl?.searchParams;
  const apiFeatures = new APIFeatures(
    query,
    Object.fromEntries(queryParams.entries()),
  );

  const prices = await apiFeatures
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate().mongooseQuery;

  return NextResponse.json(
    ApiResponse.ok({
      data: prices,
      message: "Price retrieved successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const GET = withErrorHandler(handler);
