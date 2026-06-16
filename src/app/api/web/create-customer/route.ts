import {
  CreateCustomerBody,
  validateBody,
  getCreateCustomerSchema,
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
import { createCustomer } from "@/src/service/customer-service";

async function handler(req: NextRequest) {
  await dbConnect();

  const headerList = await headers();
  const email = headerList.get("x-user-email");
  const userFromDb = await ensureUserExistByEmail(email!);
  const role = userFromDb?.role ?? "";

  const _id = userFromDb?._id;

  if (!role) {
    throw new AppError({
      message: "Role is required",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  // ensure role is customer
  authorizeRole({
    allowedRolesMask: toRoleMask({ role: "CUSTOMER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to create profile",
  });

  const body = await req.json();
  body.user = _id.toString();

  const customerData = validateBody<CreateCustomerBody>(
    getCreateCustomerSchema(),
    body,
  );
  const customer = await createCustomer({
    _id,
    customerData,
  });

  return NextResponse.json(
    ApiResponse.created({
      data: customer,
      message: "Profile created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
