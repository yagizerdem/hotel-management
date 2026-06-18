import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { headers } from "next/headers";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import { ensureBlogExistById, getBlogImage } from "@/src/service/blog-service";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const headerList = await headers();
  const email = headerList.get("x-user-email");
  const userFromDb = await ensureUserExistByEmail(email!);
  const role = userFromDb?.role ?? "";

  const params = await context.params;

  const blogFromDb = await ensureBlogExistById(params.id);

  const uri = await getBlogImage(blogFromDb._id.toString());

  return NextResponse.json(
    ApiResponse.ok({
      data: uri,
      message: "Blog updated successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const GET = withErrorHandler(handler);
