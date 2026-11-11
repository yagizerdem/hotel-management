import { withHttpErrorHandler } from "@error/with-error-handler";
import { ApiResponse } from "@lib/api-response";
import { NextResponse } from "next/server";

export const GET = withHttpErrorHandler(async () => {
  const body = ApiResponse.ok(undefined, "OK");
  return NextResponse.json(body, { status: body.httpStatusCode });
});
