import {
  validateBody,
  CreateGovernorReportBody,
  getCreateGovernorReportSchema,
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
import { createGovernorReport } from "@/src/service/governor-report";

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

  // ensure role is admin | manager | hr_manager
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) |
      toRoleMask({ role: "MANAGER" }) |
      toRoleMask({ role: "HR_MANAGER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to create governor report",
  });

  const body = await req.json();
  const governorReportData = validateBody<CreateGovernorReportBody>(
    getCreateGovernorReportSchema(),
    body,
  );
  const governorReport = await createGovernorReport(governorReportData);

  return NextResponse.json(
    ApiResponse.created({
      data: governorReport,
      message: "Governor report created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
