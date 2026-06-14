import {
  validateBody,
  getCreatePriceSchema,
  CreatePriceBody,
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
import { createPrice } from "@/src/service/price-service";

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
    message: "Unauthorized: do not have permission to create room",
  });

  const body = await req.json();
  const priceData = validateBody<CreatePriceBody>(getCreatePriceSchema(), body);
  const price = await createPrice(priceData);

  return NextResponse.json(
    ApiResponse.created({
      data: price,
      message: "Price created successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);
