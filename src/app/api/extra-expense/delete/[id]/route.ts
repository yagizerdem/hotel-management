import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { AppError } from "@/src/lib/app-error";
import { headers } from "next/headers";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import { deleteExtraExpenseById } from "@/src/service/extra-expense-service";
import { ensureExtraExpenseExistById } from "@/src/service/extra-expense-service";

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

  // ensure role is admin | manager
  // ensure role is admin | sales_manager | receptionist
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) |
      toRoleMask({ role: "SALES_MANAGER" }) |
      toRoleMask({ role: "RECEPTIONIST" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to delete extra expense",
  });

  const params = await context.params;

  await ensureExtraExpenseExistById(params.id);
  const extraExpense = await deleteExtraExpenseById(params.id);

  return NextResponse.json(
    ApiResponse.created({
      data: extraExpense,
      message: "Extra expense deleted successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const POST = withErrorHandler(handler);
