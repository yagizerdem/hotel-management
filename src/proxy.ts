import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ApiResponse } from "./lib/api-response";
import HttpStatusCode from "./lib/http-status-code";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

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
  /^\/api\/web\/update-customer$/,
  /^\/api\/web\/book$/,
  /^\/api\/web\/get-profile$/,
  /^\/api\/web\/cancel-book\/[^/]+$/,
  /^\/api\/web\/update-customer$/,
  /^\/api\/web\/calculate-reservation-price$/,
  /^\/api\/web\/calculate-reservation-price-bulk$/,
  /^\/api\/reception\/book$/,
  /^\/api\/blog\/create$/,
  /^\/api\/blog\/update\/[^/]+$/,
  /^\/api\/blog\/delete\/[^/]+$/,
  /^\/api\/blog\/get-blog-img-uri\/[^/]+$/,
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

// localization- internalization

let locales = ["en", "tr"];

function getLocale(req: NextRequest) {
  const headers = {
    "accept-language": req.headers.get("accept-language") ?? "en-US,en;q=0.5",
  };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "en";

  return match(languages, locales, defaultLocale);
}

export default async function proxy(req: NextRequest) {
  const authReq = await authenticationHandler(req);

  const { pathname } = req.nextUrl;

  // do not localize API routes, only localize page routes
  if (pathname.startsWith("/api/")) {
    return authReq;
  }

  // Localization - Internalization
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products

  return NextResponse.redirect(req.nextUrl);
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
    "/api/web/get-profile",
    "/api/web/calculate-reservation-price",
    "/api/web/calculate-reservation-price-bulk",
    "/api/web/update-customer",
    "/api/reception/book",
    "/api/blog/create",
    "/api/blog/update/:id",
    "/api/blog/delete/:id",
    "/api/blog/get-blog-img-uri/:id",

    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
