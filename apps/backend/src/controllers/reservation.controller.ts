import { ApiResponse } from "@/util/api-response.js";
import { ReservationModel } from "@/models/reservation.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import {
  getCreateReservationWebValidator,
  getInsertReservationValidator,
} from "@hotel-management/validator/reservation";
import {
  getReservationIdParamValidator,
  getUpdateReservationValidator,
} from "@hotel-management/validator/reservation";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as reservationService from "@/services/reservation.service.js";
import mongoose from "mongoose";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";

export async function getReservations(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(ReservationModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const reservationModels = await apiFeatures.mongooseQuery;

  res.send(
    ApiResponse.ok(reservationModels, "reservations fetched successfully"),
  );
}

export async function insertReservation(req: Request, res: Response) {
  const validator = getInsertReservationValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert reservation failed",
    "/api/reservations/insert",
  );

  await reservationService.insertReservation(data, req.user?.id);

  res.send(ApiResponse.ok(data, "reservation inserted successfully"));
}

export async function updateReservation(req: Request, res: Response) {
  const path = "/api/reservations/:id";
  const { id } = parseOrThrow(
    await getReservationIdParamValidator().safeParseAsync(req.params),
    "update reservation failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateReservationValidator().safeParseAsync(req.body),
    "update reservation failed",
    path,
  );

  const reservation = await reservationService.updateReservation(id, data);

  res.send(ApiResponse.ok(reservation, "reservation updated successfully"));
}

export async function deleteReservation(req: Request, res: Response) {
  const path = "/api/reservations/:id";
  const { id } = parseOrThrow(
    await getReservationIdParamValidator().safeParseAsync(req.params),
    "delete reservation failed",
    path,
  );

  await reservationService.deleteReservationById(id);

  res.send(ApiResponse.ok({ id }, "reservation deleted successfully"));
}

export async function createReservationWeb(req: Request, res: Response) {
  const user = req.user!;
  const validator = getCreateReservationWebValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "create reservation failed",
    "/api/reservations/create-web",
  );

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await reservationService.createReservationWeb(data, user.id, session);
    });
    // crate transection
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw AppError.from({
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "create profile failed",
      isOperational: false,
    });
  } finally {
    await session.endSession();
  }

  res.send(ApiResponse.ok(data, "reservation created successfully"));
}
