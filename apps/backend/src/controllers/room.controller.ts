import { ApiResponse } from "@/util/api-response.js";
import { RoomModel } from "@/models/room.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";

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
