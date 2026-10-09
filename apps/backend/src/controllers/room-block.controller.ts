import { ApiResponse } from "@/util/api-response.js";
import { RoomBlockModel } from "@/models/room-block.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertRoomBlockValidator } from "@hotel-management/validator/room-block";
import {
  getRoomBlockIdParamValidator,
  getUpdateRoomBlockValidator,
} from "@hotel-management/validator/room-block";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

export async function getRoomBlocks(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(RoomBlockModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const roomBlockModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(roomBlockModels, "room blocks fetched successfully"));
}

export async function insertRoomBlock(req: Request, res: Response) {
  const validator = getInsertRoomBlockValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert room block failed",
    "/api/room-blocks/insert",
  );

  await RoomBlockModel.insertOne({
    ...data,
    createdBy: req.user?.id,
  });

  res.send(ApiResponse.ok(data, "room block inserted successfully"));
}

export async function updateRoomBlock(req: Request, res: Response) {
  const path = "/api/room-blocks/:id";
  const { id } = parseOrThrow(
    await getRoomBlockIdParamValidator().safeParseAsync(req.params),
    "update room block failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateRoomBlockValidator().safeParseAsync(req.body),
    "update room block failed",
    path,
  );

  const roomBlock = await RoomBlockModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room block not found",
      path,
    });
  }

  res.send(ApiResponse.ok(roomBlock, "room block updated successfully"));
}

export async function deleteRoomBlock(req: Request, res: Response) {
  const path = "/api/room-blocks/:id";
  const { id } = parseOrThrow(
    await getRoomBlockIdParamValidator().safeParseAsync(req.params),
    "delete room block failed",
    path,
  );

  const roomBlock = await RoomBlockModel.findByIdAndDelete(id);

  if (!roomBlock) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "room block not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "room block deleted successfully"));
}
