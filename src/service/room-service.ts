import RoomModel from "@models/room";
import { AppError } from "@error/app-error";
import { ApiFeatures } from "@lib/api-features";
import { Room as RoomDomainModel } from "@domain/home/room";

/**
 * Lists rooms, narrowed by the request's query string: any field filters the
 * results, and limit, skip and select page and trim them.
 */
export async function getRooms(
  queryParams: URLSearchParams,
): Promise<RoomDomainModel[]> {
  try {
    const features = new ApiFeatures(RoomModel.find(), queryParams)
      .filter()
      .select()
      .skip()
      .limit();

    const rooms = await features.query;
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
  } catch (error) {
    // ApiFeatures throws a RangeError for a limit or skip that isn't a valid
    // integer, which is the caller's mistake rather than ours.
    if (error instanceof RangeError) {
      throw AppError.badRequest(error.message);
    }

    throw error;
  }
}
