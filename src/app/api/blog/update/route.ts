import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { AppError } from "@/src/lib/app-error";
import { headers } from "next/headers";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import {
  getUpdateBlogSchema,
  UpdateBlogBody,
  validateBody,
} from "@/src/lib/validators";
import {
  ensureBlogExistById,
  updateBlogById,
} from "@/src/service/blog-service";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const headerList = await headers();
  const email = headerList.get("x-user-email");
  const userFromDb = await ensureUserExistByEmail(email!);
  const role = userFromDb?.role ?? "";

  if (!role) {
    throw new AppError({
      message: "Role is required",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  // ensure role is admin | manager | hr_manager
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) |
      toRoleMask({ role: "MANAGER" }) |
      toRoleMask({ role: "HR_MANAGER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to update governor report",
  });

  const params = await context.params;

  await ensureBlogExistById(params.id);
  const body = await req.json();
  const blogData = validateBody<UpdateBlogBody>(getUpdateBlogSchema(), body);
  const blog = await updateBlogById(params.id, blogData);

  return NextResponse.json(
    ApiResponse.ok({
      data: blog,
      message: "Blog updated successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const POST = withErrorHandler(handler);
