import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ApiResponse } from "./lib/api-response";
import HttpStatusCode from "./lib/http-status-code";

const protectedRoutePatterns = [
  /^\/api\/auth\/me$/,
  /^\/api\/room\/create$/,
  /^\/api\/room\/delete\/[^/]+$/,
  /^\/api\/room\/update\/[^/]+$/,
  /^\/api\/shift\/create$/,
  /^\/api\/shift\/update\/[^/]+$/,
  /^\/api\/shift\/delete\/[^/]+$/,
  /^\/api\/price\/create$/,
  /^\/api\/price\/update\/[^/]+$/,
  /^\/api\/price\/delete\/[^/]+$/,
  /^\/api\/price\/get$/,
  /^\/api\/maintenance\/create$/,
  /^\/api\/maintenance\/update\/[^/]+$/,
  /^\/api\/maintenance\/delete\/[^/]+$/,
  /^\/api\/maintenance\/get$/,
  /^\/api\/governor-report\/create$/,
  /^\/api\/governor-report\/update\/[^/]+$/,
  /^\/api\/governor-report\/delete\/[^/]+$/,
  /^\/api\/governor-report\/get$/,
  /^\/api\/extra-expense\/create$/,
  /^\/api\/extra-expense\/update\/[^/]+$/,
  /^\/api\/extra-expense\/delete\/[^/]+$/,
  /^\/api\/extra-expense\/get$/,
  /^\/api\/web\/create-customer$/,
  /^\/api\/web\/book$/,
  /^\/api\/web\/cancel-book\/[^/]+$/,
  /^\/api\/reception\/book$/,
];

type AuthJwtPayload = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

function jsonUnauthorized(message = "Unauthorized") {
  return NextResponse.json(
    ApiResponse.custom({
      message,
      status: HttpStatusCode.UNAUTHORIZED,
      data: null,
    }),
    {
      status: HttpStatusCode.UNAUTHORIZED,
    },
  );
}

async function authenticationHandler(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutePatterns.some((pattern) =>
    pattern.test(path),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return jsonUnauthorized("Authentication token is missing");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    const { _id, role, username, email } = payload as AuthJwtPayload;

    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("x-user-id", String(_id));
    requestHeaders.set("x-user-email", String(email));
    requestHeaders.set("x-user-username", String(username));
    requestHeaders.set("x-user-role", String(role));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return jsonUnauthorized("Invalid or expired token");
  }
}

export default async function proxy(req: NextRequest) {
  return await authenticationHandler(req);
}

export const config = {
  matcher: [
    "/api/auth/me",
    "/api/room/create",
    "/api/room/delete/:id",
    "/api/room/update/:id",
    "/api/shift/create",
    "/api/shift/update/:id",
    "/api/shift/delete/:id",
    "/api/price/create",
    "/api/price/update/:id",
    "/api/price/delete/:id",
    "/api/price/get",
    "/api/maintenance/create",
    "/api/maintenance/update/:id",
    "/api/maintenance/delete/:id",
    "/api/maintenance/get",
    "/api/governor-report/create",
    "/api/governor-report/update/:id",
    "/api/governor-report/delete/:id",
    "/api/governor-report/get",
    "/api/extra-expense/create",
    "/api/extra-expense/update/:id",
    "/api/extra-expense/delete/:id",
    "/api/extra-expense/get",
    "/api/web/create-customer",
    "/api/web/book",
    "/api/web/cancel-book/:id",
    "/api/reception/book",
  ],
};
