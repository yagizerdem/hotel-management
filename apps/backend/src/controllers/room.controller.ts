import { ApiResponse } from "@/util/api-response.js";
import { RoomModel } from "@/models/room.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertRoomValidator } from "@hotel-management/validator/room";
import {
  getRoomIdParamValidator,
  getUpdateRoomValidator,
} from "@hotel-management/validator/room";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as roomService from "@/services/room.service.js";

export async function getRooms(req: Request, res: Response) {
  console.log(req.query);

  const apiFeatures = new ApiFeatures(RoomModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const roomModels = await apiFeatures.mongooseQuery;

  res.send(ApiResponse.ok(roomModels, "rooms fetched successfully"));
}

export async function insertRoom(req: Request, res: Response) {
  const validator = getInsertRoomValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert room failed",
    "/api/rooms/insert",
  );
  await roomService.insertRoom(data);
  res.send(ApiResponse.ok(data, "room inserted successfully"));
}

export async function updateRoom(req: Request, res: Response) {
  const path = "/api/rooms/:id";
  const { id } = parseOrThrow(
    await getRoomIdParamValidator().safeParseAsync(req.params),
    "update room failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateRoomValidator().safeParseAsync(req.body),
    "update room failed",
    path,
  );

  const room = await roomService.updateRoom(id, data);

  res.send(ApiResponse.ok(room, "room updated successfully"));
}

export async function deleteRoom(req: Request, res: Response) {
  const path = "/api/rooms/:id";
  const { id } = parseOrThrow(
    await getRoomIdParamValidator().safeParseAsync(req.params),
    "delete room failed",
    path,
  );

  await roomService.deleteRoomById(id);

  res.send(ApiResponse.ok({ id }, "room deleted successfully"));
}
