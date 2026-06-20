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
  /^\/api\/web\/book-bulk$/,
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

const employeeRoutePatterns = [/^.*\/dashboard\/?$/, /^.*\/dashboard\/.*$/];

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

const employeeRoles = [
  "ADMIN",
  "CUSTOMER",
  "RECEPTIONIST",
  "MANAGER",
  "HR_MANAGER",
  "SALES_MANAGER",
  "IT_SUPPORT",
  "CLEANER",
  "COOK",
  "WAITER",
  "ELECTRICIAN",
];

async function getAuthPayload(
  req: NextRequest,
): Promise<AuthJwtPayload | null> {
  const token = req.cookies.get("jwt")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return payload as AuthJwtPayload;
  } catch {
    return null;
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
  const { pathname } = req.nextUrl;

  const isProtectedApi = protectedRoutePatterns.some((pattern) =>
    pattern.test(pathname),
  );

  const isEmployeeRoute = employeeRoutePatterns.some((pattern) =>
    pattern.test(pathname),
  );

  let payload: AuthJwtPayload | null = null;

  if (isProtectedApi || isEmployeeRoute) {
    payload = await getAuthPayload(req);

    if (!payload) {
      if (pathname.startsWith("/api/")) {
        return jsonUnauthorized("Invalid or missing token");
      }

      return NextResponse.redirect(new URL("/auth/login", req.url)); // TODO add login / register page
    }
  }

  if (isEmployeeRoute) {
    const employeeRoles = [
      "ADMIN",
      "RECEPTIONIST",
      "MANAGER",
      "HR_MANAGER",
      "SALES_MANAGER",
      "IT_SUPPORT",
      "CLEANER",
      "COOK",
      "WAITER",
      "ELECTRICIAN",
    ];

    if (!employeeRoles.includes(payload!.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isProtectedApi) {
    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("x-user-id", payload!._id);
    requestHeaders.set("x-user-email", payload!.email);
    requestHeaders.set("x-user-username", payload!.username);
    requestHeaders.set("x-user-role", payload!.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname}`;

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
    "/api/web/book-bulk",
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
