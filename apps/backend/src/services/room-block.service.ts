import { RoomBlockModel } from "@/models/room-block.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertRoomBlockDTO,
  UpdateRoomBlockDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureRoomBlockExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const roomBlockFromDb = await RoomBlockModel.findById(id).session(
    session ?? null,
  );
  if (!roomBlockFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Room block with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return roomBlockFromDb;
}

export async function insertRoomBlock(
  dto: InsertRoomBlockDTO,
  createdBy?: string,
  session?: mongoose.ClientSession,
) {
  const roomBlockFromDb = await RoomBlockModel.insertOne(
    { ...dto, createdBy },
    { session },
  );
  return roomBlockFromDb;
}

export async function updateRoomBlock(
  id: string,
  dto: UpdateRoomBlockDTO,
  session?: mongoose.ClientSession,
) {
  await ensureRoomBlockExistById(id, session);

  const roomBlock = await RoomBlockModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room block not found",
    });
  }

  return roomBlock;
}

export async function deleteRoomBlockById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureRoomBlockExistById(id, session);

  const roomBlock = await RoomBlockModel.findByIdAndDelete(id, { session });

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room block not found",
    });
  }

  return roomBlock;
}
