import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { Maintenance } from "../models/maintenance";
import { Reservation, ReservationDocument } from "../models/reservation";
import { ensureCustomerExistById } from "./customer-service";
import { ensureRoomExistById } from "./room-service";
import {
  isAfter,
  isEqual,
  isBefore,
  startOfDay,
  differenceInCalendarDays,
  eachDayOfInterval,
  addDays,
} from "date-fns";
import { ensureUserExistById } from "./user-service";
import { Price } from "../models/price";

async function createReservation(reservationData: ReservationDocument) {
  await validateReservation(reservationData);

  const reservation = new Reservation({ ...reservationData });
  await calculateExpense(reservation);
  await reservation.save();
  return reservation;
}

async function createReservationBulk(reservationsData: ReservationDocument[]) {
  for (const reservationData of reservationsData) {
    await validateReservation(reservationData);
  }

  const reservations: ReservationDocument[] = [];

  for (const reservationData of reservationsData) {
    const reservation = new Reservation({ ...reservationData });
    await calculateExpense(reservation);
    reservations.push(reservation);
  }

  await Reservation.insertMany(reservations);

  return reservations;
}

async function validateReservation(reservationData: ReservationDocument) {
  const roomId = reservationData.room.toString();

  await ensureRoomExistById(roomId);
  await ensureCustomerExistById(reservationData.customer.toString());
  await ensureUserExistById(reservationData.createdBy.toString());

  const startDate = reservationData.checkInDate;
  const endDate = reservationData.checkOutDate;

  const today = startOfDay(new Date());

  if (isBefore(startOfDay(startDate), today)) {
    throw new AppError({
      message: "Check-in date cannot be in the past",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  if (isBefore(startOfDay(endDate), today)) {
    throw new AppError({
      message: "Check-out date cannot be in the past",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  if (isAfter(startDate, endDate) || isEqual(startDate, endDate)) {
    throw new AppError({
      message: "Check-in date cannot be after or equal to check-out date",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const earlyAmount = differenceInCalendarDays(startDate, today);

  if (earlyAmount > 120) {
    throw new AppError({
      message: "Reservations can only be made up to 4 months in advance",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const stayAmount = differenceInCalendarDays(endDate, startDate);

  if (stayAmount <= 0 || stayAmount > 15) {
    throw new AppError({
      message: "Reservation duration must be between 1 and 15 days",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const existReservation = await Reservation.exists({
    status: { $in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
    room: reservationData.room,
    checkInDate: { $lt: endDate },
    checkOutDate: { $gt: startDate },
  });

  if (existReservation) {
    throw new AppError({
      message: "Room is already reserved for the selected dates",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const existMaintenance = await Maintenance.exists({
    room: roomId,
    status: { $in: ["PLANNED", "ACTIVE"] },
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
  });

  if (existMaintenance) {
    throw new AppError({
      message: "Room is under maintenance for the selected dates",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

async function calculateExpense(
  reservation: ReservationDocument,
): Promise<ReservationDocument> {
  const checkIn = startOfDay(reservation.checkInDate);
  const checkOut = startOfDay(reservation.checkOutDate);

  const room = await ensureRoomExistById(reservation.room.toString());

  const totalDays = differenceInCalendarDays(checkOut, checkIn);

  if (totalDays <= 0) {
    throw new AppError({
      message: "Check-out date must be after check-in date",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const stayNights = eachDayOfInterval({
    start: checkIn,
    end: addDays(checkOut, -1),
  });

  const prices = await Price.find({
    roomType: room.type,
    packageType: reservation.packageType,
    validFrom: { $lte: addDays(checkOut, -1) },
    validTo: { $gte: checkIn },
  }).sort({ validFrom: 1 });

  if (prices.length === 0) {
    throw new AppError({
      message: "No price found for the selected room, package and dates",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  let grossTotal = 0;

  for (const night of stayNights) {
    const priceForNight = prices.find((price) => {
      const validFrom = startOfDay(price.validFrom);
      const validTo = startOfDay(price.validTo);

      return night >= validFrom && night <= validTo;
    });

    if (!priceForNight) {
      throw new AppError({
        message: `No price found for night ${night.toISOString().slice(0, 10)}`,
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      });
    }

    const nightlyPrice = Number(priceForNight.nightlyPrice);

    if (!Number.isFinite(nightlyPrice) || nightlyPrice <= 0) {
      throw new AppError({
        message: `Invalid nightly price for night ${night.toISOString().slice(0, 10)}`,
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      });
    }

    grossTotal += nightlyPrice;
  }

  let discountRate = 0;

  if (reservation.source === "RECEPTION") {
    discountRate = Number(reservation.discountRate ?? 0);

    if (
      !Number.isFinite(discountRate) ||
      discountRate < 0 ||
      discountRate > 100
    ) {
      throw new AppError({
        message: "Invalid discount rate",
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      });
    }
  } else {
    const earlyAmount = differenceInCalendarDays(
      checkIn,
      startOfDay(new Date()),
    );

    if (earlyAmount >= 90) {
      discountRate = 23;
    } else if (
      earlyAmount >= 30 &&
      reservation.packageType === "ALL_INCLUSIVE"
    ) {
      discountRate = 18;
    } else if (earlyAmount >= 30 && reservation.packageType === "FULL_BOARD") {
      discountRate = 16;
    }
  }

  const discountedTotal = grossTotal - (grossTotal * discountRate) / 100;

  reservation.nightlyPrice = Math.round((grossTotal / totalDays) * 100) / 100;
  reservation.discountRate = discountRate;
  reservation.totalPrice = Math.round(discountedTotal * 100) / 100;

  return reservation;
}

async function cancelBooking(reservationId: string) {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new AppError({
      message: `Reservation does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  if (reservation.status === "CANCELLED") {
    throw new AppError({
      message: "Reservation is already cancelled",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  reservation.status = "CANCELLED";
  await reservation.save();
  return reservation;
}

export {
  createReservation,
  cancelBooking,
  createReservationBulk,
  calculateExpense,
};
