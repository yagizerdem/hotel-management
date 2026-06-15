import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { APIFeatures } from "@/src/lib/api-features";
import { ExtraExpense } from "@/src/models/extraExpense";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import { AppError } from "@/src/lib/app-error";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import { headers } from "next/headers";

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

  // ensure role is admin | sales_manager | receptionist
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) |
      toRoleMask({ role: "SALES_MANAGER" }) |
      toRoleMask({ role: "RECEPTIONIST" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to create extra expense",
  });

  const query = ExtraExpense.find({});
  const queryParams = req?.nextUrl?.searchParams;
  const apiFeatures = new APIFeatures(
    query,
    Object.fromEntries(queryParams.entries()),
  );

  const extraExpenses = await apiFeatures
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate().mongooseQuery;

  return NextResponse.json(
    ApiResponse.ok({
      data: extraExpenses,
      message: "Extra expenses retrieved successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const GET = withErrorHandler(handler);
