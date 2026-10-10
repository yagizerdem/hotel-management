import { RoomModel } from "@/models/room.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type { InsertRoomDTO } from "@hotel-management/validator";

export async function ensureRoomExistById(id: number) {
  const roomFromDb = await RoomModel.findById(id);
  if (!roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Room with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return roomFromDb;
}

export async function ensureRoomNotExistById(id: number) {
  const roomFromDb = await RoomModel.findById(id);
  if (roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Room with id ${id} already exists`,
      isOperational: true,
    });
  }
}

export async function ensureRoomExistByNumber(number: string) {
  const roomFromDb = await RoomModel.findOne({
    number: number,
  });
  if (!roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Room with number ${number} does not exist`,
      isOperational: true,
    });
  }
  return roomFromDb;
}

export async function ensureRoomNotExistByNumber(number: string) {
  const roomFromDb = await RoomModel.findOne({
    number: number,
  });
  if (roomFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Room with number ${number} already exists`,
      isOperational: true,
    });
  }
}

export async function insertRoom(dto: InsertRoomDTO) {
  await ensureRoomNotExistByNumber(dto.number);

  const roomFromDb = await RoomModel.insertOne(dto);
  return roomFromDb;
}
