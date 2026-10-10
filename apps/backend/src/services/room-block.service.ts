import { RoomBlockModel } from "@/models/room-block.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertRoomBlockDTO,
  UpdateRoomBlockDTO,
} from "@hotel-management/validator";

export async function ensureRoomBlockExistById(id: string) {
  const roomBlockFromDb = await RoomBlockModel.findById(id);
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
) {
  const roomBlockFromDb = await RoomBlockModel.insertOne({ ...dto, createdBy });
  return roomBlockFromDb;
}

export async function updateRoomBlock(id: string, dto: UpdateRoomBlockDTO) {
  await ensureRoomBlockExistById(id);

  const roomBlock = await RoomBlockModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room block not found",
    });
  }

  return roomBlock;
}

export async function deleteRoomBlockById(id: string) {
  await ensureRoomBlockExistById(id);

  const roomBlock = await RoomBlockModel.findByIdAndDelete(id);

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room block not found",
    });
  }

  return roomBlock;
}
