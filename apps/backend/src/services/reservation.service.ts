import { ReservationModel } from "@/models/reservation.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertReservationDTO,
  UpdateReservationDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureReservationExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const reservationFromDb = await ReservationModel.findById(id).session(
    session ?? null,
  );
  if (!reservationFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Reservation with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return reservationFromDb;
}

export async function insertReservation(
  dto: InsertReservationDTO,
  createdBy?: string,
  session?: mongoose.ClientSession,
) {
  const reservationFromDb = await ReservationModel.insertOne(
    {
      ...dto,
      createdBy,
    },
    { session },
  );
  return reservationFromDb;
}

export async function updateReservation(
  id: string,
  dto: UpdateReservationDTO,
  session?: mongoose.ClientSession,
) {
  await ensureReservationExistById(id, session);

  const reservation = await ReservationModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!reservation) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "reservation not found",
    });
  }

  return reservation;
}

export async function deleteReservationById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureReservationExistById(id, session);

  const reservation = await ReservationModel.findByIdAndDelete(id, { session });

  if (!reservation) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "reservation not found",
    });
  }

  return reservation;
}
