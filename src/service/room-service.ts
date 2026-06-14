import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { CreateRoomBody, UpdateRoomBody } from "../lib/validators";
import { Room } from "../models/room";

async function createRoom(roomData: CreateRoomBody) {
  const room = new Room({ ...roomData });
  await room.save();

  return room;
}

async function deleteByRoomById(roomId: string) {
  const deletedRoom = await Room.findByIdAndDelete(roomId);
  return deletedRoom;
}

async function ensureRoomExistById(roomId: string) {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new AppError({
      message: `Room with id ${roomId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return room;
}

async function updateRoomById(roomId: string, roomData: UpdateRoomBody) {
  const updatedRoom = await Room.findByIdAndUpdate(
    roomId,
    { $set: roomData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedRoom) {
    throw new AppError({
      message: `Room with id ${roomId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedRoom;
}

export { createRoom, deleteByRoomById, ensureRoomExistById, updateRoomById };
