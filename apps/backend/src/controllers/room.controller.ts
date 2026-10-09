import { ApiResponse } from "@/util/api-response.js";
import { RoomModel } from "@/models/room.model.js";
import type { Request, Response } from "express";

export async function getRooms(req: Request, res: Response) {
  console.log(req.query);

  const rooms = await RoomModel.find().sort({ number: 1 }).lean();

  res.send(ApiResponse.ok(rooms, "rooms fetched successfully"));
}
