import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import type { UserRole } from "@hotel-management/models";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";

interface AccessTokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

export async function authenticationGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies["accessToken"];

  const JWT_SECRET: string =
    process.env.JWT_SECRET ??
    (() => {
      throw new Error("JWT_SECRET is not defined");
    })();

  const JWT_ISSUER =
    process.env.JWT_ISSUER ??
    (() => {
      throw new Error("JWT_ISSUER is not defined");
    })();
  const JWT_AUDIENCE = process.env.JWT_AUDIENCE ?? "hotel-management-users";

  let result;
  try {
    result = await jwtVerify<AccessTokenPayload>(
      accessToken,
      new TextEncoder().encode(JWT_SECRET),
      {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      },
    );
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = {
    id: result.payload.id,
    email: result.payload.email,
    role: result.payload.role,
  };

  req.user = user;

  return next();
}

export function authorizationGuard(requiredRole: UserRole[]) {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !requiredRole.includes(req.user.role)) {
      throw AppError.from({
        httpStatusCode: HttpStatusCode.FORBIDDEN,
        message: "Forbidden",
        isOperational: true,
      });
    }
    return next();
  };
  return middleware;
}
