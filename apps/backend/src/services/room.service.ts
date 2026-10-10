import { ReservationModel } from "@/models/reservation.model.js";
import { RoomBlockModel } from "@/models/room-block.model.js";
import { RoomModel } from "@/models/room.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type { InsertRoomDTO, UpdateRoomDTO } from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureRoomExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const roomFromDb = await RoomModel.findById(id).session(session ?? null);
  if (!roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Room with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return roomFromDb;
}

export async function ensureRoomNotExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const roomFromDb = await RoomModel.findById(id).session(session ?? null);
  if (roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Room with id ${id} already exists`,
      isOperational: true,
    });
  }
}

export async function ensureRoomExistByNumber(
  number: string,
  session?: mongoose.ClientSession,
) {
  const roomFromDb = await RoomModel.findOne({
    number: number,
  }).session(session ?? null);
  if (!roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Room with number ${number} does not exist`,
      isOperational: true,
    });
  }
  return roomFromDb;
}

export async function ensureRoomNotExistByNumber(
  number: string,
  session?: mongoose.ClientSession,
) {
  const roomFromDb = await RoomModel.findOne({
    number: number,
  }).session(session ?? null);
  if (roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Room with number ${number} already exists`,
      isOperational: true,
    });
  }
}

export async function insertRoom(
  dto: InsertRoomDTO,
  session?: mongoose.ClientSession,
) {
  await ensureRoomNotExistByNumber(dto.number, session);
  const roomFromDb = await RoomModel.insertOne(dto, { session });
  return roomFromDb;
}

export async function updateRoom(
  id: string,
  dto: UpdateRoomDTO,
  session?: mongoose.ClientSession,
) {
  await ensureRoomExistById(id, session);

  const room = await RoomModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!room) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room not found",
    });
  }

  return room;
}

export async function deleteRoomById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureRoomExistById(id, session);

  const room = await RoomModel.findByIdAndDelete(id, { session });

  if (!room) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room not found",
    });
  }

  return room;
}

export async function getAvailableRooms(
  checkInDate: string,
  checkOutDate: string,
  session?: mongoose.ClientSession,
) {
  const occupiedRoomIds = await ReservationModel.find({
    checkInDate: { $lte: checkOutDate },
    checkOutDate: { $gte: checkInDate },
  }).distinct("room");

  const blockedRoomIds = await RoomBlockModel.find({
    startDate: { $lte: checkOutDate },
    endDate: { $gte: checkInDate },
  }).distinct("roomId");

  const unavailableRoomIds = [...occupiedRoomIds, ...blockedRoomIds];

  const rooms = await RoomModel.find({
    _id: {
      $nin: unavailableRoomIds,
    },
  }).session(session ?? null);

  return rooms;
}
