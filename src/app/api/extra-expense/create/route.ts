import {
  validateBody,
  CreateExtraExpenseBody,
  getCreateExtraExpenseSchema,
} from "@/src/lib/validators";
import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { AppError } from "@/src/lib/app-error";
import { headers } from "next/headers";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import { createExtraExpense } from "@/src/service/extra-expense-service";

async function handler(req: NextRequest) {
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

  const body = await req.json();
  const extraExpenseData = validateBody<CreateExtraExpenseBody>(
    getCreateExtraExpenseSchema(),
    body,
  );
  const extraExpense = await createExtraExpense(extraExpenseData);

  return NextResponse.json(
    ApiResponse.created({
      data: extraExpense,
      message: "Extra expense created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
