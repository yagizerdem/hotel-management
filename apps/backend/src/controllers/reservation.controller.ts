import { ApiResponse } from "@/util/api-response.js";
import { ReservationModel } from "@/models/reservation.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertReservationValidator } from "@hotel-management/validator/reservation";
import {
  getReservationIdParamValidator,
  getUpdateReservationValidator,
} from "@hotel-management/validator/reservation";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

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

  await ReservationModel.insertOne({
    ...data,
    createdBy: req.user?.id,
  });

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

  const reservation = await ReservationModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!reservation) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "reservation not found",
      path,
    });
  }

  res.send(ApiResponse.ok(reservation, "reservation updated successfully"));
}

export async function deleteReservation(req: Request, res: Response) {
  const path = "/api/reservations/:id";
  const { id } = parseOrThrow(
    await getReservationIdParamValidator().safeParseAsync(req.params),
    "delete reservation failed",
    path,
  );

  const reservation = await ReservationModel.findByIdAndDelete(id);

  if (!reservation) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "reservation not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "reservation deleted successfully"));
}
