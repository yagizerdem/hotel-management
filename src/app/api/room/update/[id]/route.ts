import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { AppError } from "@/src/lib/app-error";
import { headers } from "next/headers";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import {
  ensureRoomExistById,
  updateRoomById,
} from "@/src/service/room-service";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import {
  getUpdateRoomSchema,
  UpdateRoomBody,
  validateBody,
} from "@/src/lib/validators";

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

  // ensure role is admin
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) | toRoleMask({ role: "MANAGER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to update room",
  });

  const params = await context.params;

  await ensureRoomExistById(params.id);
  const body = await req.json();
  const roomData = validateBody<UpdateRoomBody>(getUpdateRoomSchema(), body);
  const room = await updateRoomById(params.id, roomData);

  return NextResponse.json(
    ApiResponse.created({
      data: room,
      message: "Room updated successfully!",
    }),
    {
      status: HttpStatusCode.OK,
    },
  );
}

export const POST = withErrorHandler(handler);
