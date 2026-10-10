import { ReservationModel } from "@/models/reservation.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertReservationDTO,
  UpdateReservationDTO,
} from "@hotel-management/validator";
import type { CreateReservationWebDTO } from "@hotel-management/validator/reservation";
import type mongoose from "mongoose";
import * as userService from "@/services/user.service.js";
import moment from "moment";
import { RoomBlockModel } from "@/models/room-block.model.js";
import { ReservationSource, ReservationStatus } from "@hotel-management/models";

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

export async function createReservationWeb(
  dto: CreateReservationWebDTO,
  userId: string,
  session?: mongoose.ClientSession,
) {
  const userFromDb = await userService.ensureUserIsActiveById(userId, session);
  if (!userFromDb.customer) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "User does not have a customer profile",
      isOperational: true,
    });
  }

  validateCheckInAndCheckOutDates(
    dto.checkInDate.toString(),
    dto.checkOutDate.toString(),
  );

  await ensureRoomBlockNotExist(
    dto.room,
    dto.checkInDate.toString(),
    dto.checkOutDate.toString(),
  );

  const reservationFromDb = await ReservationModel.insertOne(
    {
      ...dto,
      createdBy: userId,
      nights: moment(dto.checkOutDate).diff(moment(dto.checkInDate), "days"),
      totalPrice: 0,
      nightlyPrice: 0,
      status: ReservationStatus.PENDING,
      source: ReservationSource.WEB,
      customer: userFromDb.customer,
    },
    { session },
  );

  return reservationFromDb;
}

function validateCheckInAndCheckOutDates(
  checkInDate: string,
  checkOutDate: string,
) {
  if (!moment(checkInDate).isValid() || !moment(checkOutDate).isValid()) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "Invalid check-in or check-out date",
      isOperational: true,
    });
  }

  if (moment(checkInDate).isAfter(moment(checkOutDate))) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "Check-in date cannot be after check-out date",
      isOperational: true,
    });
  }

  if (moment(checkOutDate).diff(moment(checkInDate), "days") < 1) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "Check-out date must be at least 1 day after check-in date",
      isOperational: true,
    });
  }

  if (moment(checkOutDate).diff(moment(checkInDate), "days") > 15) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "Check-out date cannot be more than 15 days after check-in date",
      isOperational: true,
    });
  }
}

async function ensureRoomBlockNotExist(
  roomId: string,
  checkInDate: string,
  checkOutDate: string,
) {
  const roomBlock = await RoomBlockModel.findOne({
    roomId,
    startDate: { $lte: checkInDate },
    endDate: { $gte: checkOutDate },
  });

  if (roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "The selected room is already blocked for the chosen dates",
      isOperational: true,
    });
  }
}

async function ensureRoomBlockExist(
  roomId: string,
  checkInDate: string,
  checkOutDate: string,
) {
  const roomBlock = await RoomBlockModel.findOne({
    roomId,
    startDate: { $lte: checkInDate },
    endDate: { $gte: checkOutDate },
  });

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: "The selected room is not blocked for the chosen dates",
      isOperational: true,
    });
  }
}
