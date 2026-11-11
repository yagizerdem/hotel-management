"use server";

import { Room as RoomDomainModel } from "@domain/home/room";
import connectDb from "@lib/db";
import RoomModel from "@models/room";

export async function getHotelRooms(): Promise<RoomDomainModel[]> {
  await connectDb();
  const rooms = await RoomModel.find();
  return rooms.map((room) => ({
    id: room._id.toString(),
    number: room.number,
    floor: room.floor,
    roomTypeId: room.roomType.toString(),
    amenities: {
      balcony: room.amenities?.balcony ?? false,
      minibar: room.amenities?.minibar ?? false,
      airConditioning: room.amenities?.airConditioning ?? true,
      tv: room.amenities?.tv ?? true,
      hairDryer: room.amenities?.hairDryer ?? true,
      wifi: room.amenities?.wifi ?? true,
    },
  }));
}
