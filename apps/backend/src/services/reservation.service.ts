import { ReservationModel } from "@/models/reservation.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertReservationDTO,
  UpdateReservationDTO,
} from "@hotel-management/validator";

export async function ensureReservationExistById(id: string) {
  const reservationFromDb = await ReservationModel.findById(id);
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
) {
  const reservationFromDb = await ReservationModel.insertOne({
    ...dto,
    createdBy,
  });
  return reservationFromDb;
}

export async function updateReservation(id: string, dto: UpdateReservationDTO) {
  await ensureReservationExistById(id);

  const reservation = await ReservationModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!reservation) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "reservation not found",
    });
  }

  return reservation;
}

export async function deleteReservationById(id: string) {
  await ensureReservationExistById(id);

  const reservation = await ReservationModel.findByIdAndDelete(id);

  if (!reservation) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "reservation not found",
    });
  }

  return reservation;
}
