import { ApiResponse } from "@/util/api-response.js";
import { RoomModel } from "@/models/room.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import {
  getCheckInCheckOutValidator,
  getInsertRoomValidator,
} from "@hotel-management/validator/room";
import {
  getRoomIdParamValidator,
  getUpdateRoomValidator,
} from "@hotel-management/validator/room";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as roomService from "@/services/room.service.js";
import type { ClientRoomResponseDTO } from "@hotel-management/shared";

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

export async function getAvailableRooms(req: Request, res: Response) {
  const path = "/api/rooms/available";
  const { checkInDate, checkOutDate } = parseOrThrow(
    await getCheckInCheckOutValidator().safeParseAsync(req.query),
    "get available rooms failed",
    path,
  );

  const rooms = await roomService.getAvailableRooms(checkInDate, checkOutDate);

  res.send(ApiResponse.ok(rooms, "available rooms fetched successfully"));
}

export async function clientGetAllRooms(req: Request, res: Response) {
  const rooms = await RoomModel.find();
  const roomData: ClientRoomResponseDTO[] = rooms.map((room) => ({
    id: room._id.toString(),
    number: room.number,
    floor: room.floor,
    type: room.type,
    beds: {
      single: room.beds?.single ?? 0,
      double: room.beds?.double ?? 0,
    },
    hasBalcony: room.hasBalcony,
    hasMinibar: room.hasMinibar,
    amenities: room.amenities,
  }));

  res.send(ApiResponse.ok(roomData, "all rooms fetched successfully"));
}
