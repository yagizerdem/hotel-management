import {
  validateBody,
  getCreateMaintenanceSchema,
  CreateMaintenanceBody,
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
import { createMaintenance } from "@/src/service/maintenance-service";

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

  // ensure role is admin | manager
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) | toRoleMask({ role: "MANAGER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to create maintenance",
  });

  const body = await req.json();
  const maintenanceData = validateBody<CreateMaintenanceBody>(
    getCreateMaintenanceSchema(),
    body,
  );
  const maintenance = await createMaintenance(maintenanceData);

  return NextResponse.json(
    ApiResponse.created({
      data: maintenance,
      message: "Maintenance created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
