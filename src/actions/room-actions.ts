"use server";

import type {
  Room as RoomDomainModel,
  RoomRate as RoomRateDomainModel,
} from "@domain/home/room";
import connectDb from "@lib/db";
import RoomModel from "@models/room";
import RoomRateModel from "@models/room-rate";
import RoomTypeModel, { type RoomTypeDocument } from "@models/room-type";

export async function getHotelRooms(): Promise<RoomDomainModel[]> {
  await connectDb();
  // The generic tells TypeScript that roomType holds the populated
  // subdocument rather than its ObjectId. Passing the model, not just the
  // ref name, keeps its import from being dropped, so the schema is
  // registered before populate looks it up.
  const rooms = await RoomModel.find().populate<{
    roomType: RoomTypeDocument;
  }>({ path: "roomType", model: RoomTypeModel });

  return rooms.map((room) => ({
    id: room._id.toString(),
    number: room.number,
    floor: room.floor,
    roomTypeId: room.roomType._id.toString(),
    amenities: {
      balcony: room.amenities?.balcony ?? false,
      minibar: room.amenities?.minibar ?? false,
      airConditioning: room.amenities?.airConditioning ?? true,
      tv: room.amenities?.tv ?? true,
      hairDryer: room.amenities?.hairDryer ?? true,
      wifi: room.amenities?.wifi ?? true,
    },
    roomType: {
      id: room.roomType._id.toString(),
      code: room.roomType.code,
      name: room.roomType.name,
      description: room.roomType.description ?? "",
      capacity: room.roomType.capacity,
      beds: {
        single: room.roomType.beds?.single ?? 0,
        double: room.roomType.beds?.double ?? 0,
      },
      images: room.roomType.images ?? [],
    },
  }));
}

/** Rates that are still valid today or start later, earliest first. */
export async function getHotelRoomRates(): Promise<RoomRateDomainModel[]> {
  await connectDb();
  const rates = await RoomRateModel.find({ validTo: { $gte: new Date() } })
    .sort({ validFrom: 1 })
    .populate<{ roomType: RoomTypeDocument }>({
      path: "roomType",
      model: RoomTypeModel,
    });

  return rates.map((rate) => ({
    roomType: {
      id: rate.roomType._id.toString(),
      code: rate.roomType.code,
      name: rate.roomType.name,
      description: rate.roomType.description ?? "",
      capacity: rate.roomType.capacity,
      beds: {
        single: rate.roomType.beds?.single ?? 0,
        double: rate.roomType.beds?.double ?? 0,
      },
      images: rate.roomType.images ?? [],
    },
    boardType: rate.boardType,
    validFrom: rate.validFrom,
    validTo: rate.validTo,
    nightlyPrice: rate.nightlyPrice,
    currency: rate.currency,
  }));
}
