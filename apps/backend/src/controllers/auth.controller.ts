import { ApiResponse } from "@/util/api-response.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import {
  getClientLoginValidator,
  getClientRegisterValidator,
} from "@validator/register.validator.js";
import type { Request, Response } from "express";
import { createHash, createSecretKey, randomUUID } from "crypto";
import { z } from "zod";
import type { RegisterResopnseDTO } from "@hotel/shared";
import { UserModel } from "@/models/user.model.js";
import { UserRole } from "@/models/enums.js";
import * as jose from "jose";
import bcrypt from "bcrypt";
import { RefreshTokenModel } from "@/models/refresh-token.model.js";

export async function register(req: Request, res: Response) {
  const registerValidator = getClientRegisterValidator();

  const userData = await registerValidator.safeParseAsync(req.body);

  if (!userData.success) {
    const otherErrors: string[] = z.flattenError(userData.error).formErrors;
    const fieldErrors: Record<string, string[]> = z.flattenError(
      userData.error,
    ).fieldErrors;

    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "register failed",
      formErrors: fieldErrors,
      errors: otherErrors,
      path: "/api/auth/register",
    });
  }

  const exist = await UserModel.exists({
    email: userData.data.email,
  });

  if (exist) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: "email already exists",
      path: "/api/auth/register",
    });
  }

  const passwordHash = await bcrypt.hash(userData.data.password, 10);

  await UserModel.insertOne({
    email: userData.data.email,
    passwordHash: passwordHash,
    role: UserRole.CUSTOMER,
    isActive: true,
  });

  res.status(HttpStatusCode.CREATED).send(
    ApiResponse.created<RegisterResopnseDTO>({
      email: userData.data.email,
    }),
  );
}

export async function login(req: Request, res: Response) {
  const { accessTokenExpirationTime, refreshTokenExpirationTime } =
    getJwtConfig();

  const loginValidator = getClientLoginValidator();
  const userData = await loginValidator.safeParseAsync(req.body);

  if (!userData.success) {
    const otherErrors: string[] = z.flattenError(userData.error).formErrors;
    const fieldErrors: Record<string, string[]> = z.flattenError(
      userData.error,
    ).fieldErrors;

    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "login failed",
      formErrors: fieldErrors,
      errors: otherErrors,
      path: "/api/auth/login",
    });
  }

  const userFromDb = await UserModel.findOne({
    email: userData.data.email,
  }).select("+passwordHash");

  // Same error for unknown email, wrong password and inactive user
  // so the response does not reveal which emails exist.
  const isPasswordValid =
    !!userFromDb &&
    (await bcrypt.compare(userData.data.password, userFromDb.passwordHash));

  if (!userFromDb || !isPasswordValid || !userFromDb.isActive) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      message: "invalid credentials",
      path: "/api/auth/login",
    });
  }

  const accessTokenMs = parseDurationMs(accessTokenExpirationTime);
  const refreshTokenMs = parseDurationMs(refreshTokenExpirationTime);

  const refreshToken = await signRefreshToken(userFromDb, getJwtConfig());
  const accessToken = await signAccessToken(userFromDb, getJwtConfig());

  // set refresh token to db
  await RefreshTokenModel.create({
    user: userFromDb._id.toString(),
    tokenHash: createHash("sha256").update(refreshToken).digest("hex"),
    expiresAt: new Date(Date.now() + refreshTokenMs),
  });

  // set access token and refersh token to http-only cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessTokenMs,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: refreshTokenMs,
  });

  res.status(HttpStatusCode.OK).send(ApiResponse.ok({}, "login successful"));
}

export async function refresh(req: Request, res: Response) {
  const config = getJwtConfig();
  const path = "/api/auth/refresh";

  const invalid = () =>
    AppError.from({
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      message: "invalid refresh token",
      path,
    });

  const refreshToken: unknown = req.cookies?.refreshToken;
  if (typeof refreshToken !== "string" || !refreshToken) throw invalid();

  try {
    await jose.jwtVerify(refreshToken, config.secretKey, {
      issuer: config.issuer,
      audience: config.audience,
    });
  } catch {
    throw invalid();
  }

  // The signature alone is not enough: the token must still be stored,
  // not revoked and not expired.
  const stored = await RefreshTokenModel.findOne({
    tokenHash: createHash("sha256").update(refreshToken).digest("hex"),
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  });
  if (!stored) throw invalid();

  // Load the user again so role changes and deactivation apply immediately.
  const user = await UserModel.findById(stored.user);
  if (!user || !user.isActive) throw invalid();

  const accessToken = await signAccessToken(user, config);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseDurationMs(config.accessTokenExpirationTime),
  });

  res
    .status(HttpStatusCode.OK)
    .send(ApiResponse.ok({}, "access token refreshed"));
}

export function logout(req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/auth" });
  res.status(HttpStatusCode.OK).send(ApiResponse.ok({}, "logout successful"));
}

function signAccessToken(
  user: { _id: { toString(): string }; role: string; email: string },
  config: ReturnType<typeof getJwtConfig>,
): Promise<string> {
  return new jose.SignJWT({
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  }) // payload
    .setProtectedHeader({ alg: "HS256" }) // algorithm
    .setIssuedAt()
    .setIssuer(config.issuer) // issuer
    .setAudience(config.audience) // audience
    .setExpirationTime(config.accessTokenExpirationTime) // token expiration time, e.g., "15m"
    .sign(config.secretKey); // secretKey generated from previous step
}

function signRefreshToken(
  user: { _id: { toString(): string }; role: string; email: string },
  config: ReturnType<typeof getJwtConfig>,
): Promise<string> {
  return new jose.SignJWT({
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  }) // payload
    .setProtectedHeader({ alg: "HS256" }) // algorithm
    .setIssuedAt()
    .setJti(randomUUID()) // unique per token, keeps tokenHash unique
    .setIssuer(config.issuer) // issuer
    .setAudience(config.audience) // audience
    .setExpirationTime(config.refreshTokenExpirationTime) // token expiration time, e.g., "30d"
    .sign(config.secretKey); // secretKey generated from previous step
}

const DURATION_UNIT_MS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

// Converts values like "15m" or "30d" to milliseconds.
function parseDurationMs(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: `Invalid token expiration time: ${value}`,
      isOperational: false,
    });
  }
  return (
    Number(match[1]) *
    DURATION_UNIT_MS[match[2] as keyof typeof DURATION_UNIT_MS]
  );
}

function getJwtConfig() {
  const {
    JWT_SECRET,
    JWT_ISSUER,
    JWT_AUDIENCE,
    REFRESH_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_EXPIRATION_TIME,
  } = process.env;

  const missing = Object.entries({
    JWT_SECRET,
    JWT_ISSUER,
    JWT_AUDIENCE,
    REFRESH_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_EXPIRATION_TIME,
  })
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (
    !JWT_SECRET ||
    !JWT_ISSUER ||
    !JWT_AUDIENCE ||
    !REFRESH_TOKEN_EXPIRATION_TIME ||
    !ACCESS_TOKEN_EXPIRATION_TIME
  ) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: `Missing JWT environment variables: ${missing.join(", ")}`,
      isOperational: false,
    });
  }

  return {
    secretKey: createSecretKey(JWT_SECRET, "utf-8"),
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    accessTokenExpirationTime: ACCESS_TOKEN_EXPIRATION_TIME,
    refreshTokenExpirationTime: REFRESH_TOKEN_EXPIRATION_TIME,
  };
}
