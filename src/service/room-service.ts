import RoomModel from "@models/room";
import RoomNightModel from "@models/room-night";
import RoomRateModel from "@models/room-rate";
import RoomTypeModel, { type RoomTypeDocument } from "@models/room-type";
import { AppError } from "@error/app-error";
import { MachineCode } from "@lib/machine-code";
import { ApiFeatures } from "@lib/api-features";
import {
  AvailableRoom as AvailableRoomDomainModel,
  Room as RoomDomainModel,
} from "@domain/home/room";
import { getAvailableRoomsSchema } from "@validator/room-validator";

const DAY_MS = 24 * 60 * 60 * 1000;

// Query string keys that describe the stay. They are read here and kept out
// of ApiFeatures, which would otherwise treat them as room fields.
const STAY_PARAMS = ["checkIn", "checkOut", "guests", "boardType"];

// Fields the availability search sets itself, so a query string can't
// widen it, for example by asking for a room type that is too small.
const LOCKED_FIELDS = ["_id", "roomType", "isActive"];

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
      throw AppError.badRequest(error.message, {
        machineCode: MachineCode.INVALID_QUERY_PARAM,
      });
    }

    throw error;
  }
}

/** Every night of a stay, from check-in up to but not including check-out. */
function nightsOfStay(checkIn: Date, checkOut: Date) {
  const nights: Date[] = [];
  for (let t = checkIn.getTime(); t < checkOut.getTime(); t += DAY_MS) {
    nights.push(new Date(t));
  }
  return nights;
}

/** How many people the beds sleep: one per single bed, two per double. */
function sleepingPlaces(beds: RoomTypeDocument["beds"]) {
  return (beds?.single ?? 0) + 2 * (beds?.double ?? 0);
}

/**
 * Lists the rooms that are free for a stay and sleep the guests, with the
 * stay's price on the chosen board type.
 *
 * The query string needs checkIn and checkOut (YYYY-MM-DD), guests and
 * boardType. Any other key goes through ApiFeatures: room fields such as
 * floor or amenities.balcony filter the results, and limit and skip page
 * them.
 *
 * A room is listed only if
 * - its room type's capacity and its beds both fit the guests,
 * - its room type has a rate on the board type for every night, and
 * - none of the nights is taken by a reservation or a maintenance block.
 */
export async function getAvailableRooms(
  queryParams: URLSearchParams,
): Promise<AvailableRoomDomainModel[]> {
  const result = getAvailableRoomsSchema().safeParse(
    Object.fromEntries(
      STAY_PARAMS.map((key) => [key, queryParams.get(key) ?? undefined]),
    ),
  );
  if (!result.success) {
    throw AppError.fromZod(result.error);
  }
  const { checkIn, checkOut, guests, boardType } = result.data;
  const nights = nightsOfStay(checkIn, checkOut);
  const lastNight = nights[nights.length - 1];

  // A room type has to allow the guests and have a bed for each of them.
  const roomTypes = (
    await RoomTypeModel.find({ capacity: { $gte: guests } })
  ).filter((roomType) => sleepingPlaces(roomType.beds) >= guests);

  const rates = await RoomRateModel.find({
    roomType: { $in: roomTypes.map((roomType) => roomType._id) },
    boardType,
    validFrom: { $lte: lastNight },
    validTo: { $gte: checkIn },
  });

  // The stay's price per room type. A type with a night that no rate covers
  // can't be priced, so it isn't offered.
  const pricingByRoomType = new Map<
    string,
    AvailableRoomDomainModel["pricing"]
  >();
  for (const roomType of roomTypes) {
    const typeRates = rates.filter((rate) => rate.roomType.equals(roomType._id));
    const nightlyRates = [];
    for (const night of nights) {
      const rate = typeRates.find(
        (r) => r.validFrom <= night && r.validTo >= night,
      );
      if (!rate) break;
      nightlyRates.push({ night, amount: rate.nightlyPrice, currency: rate.currency });
    }
    if (nightlyRates.length !== nights.length) continue;

    pricingByRoomType.set(String(roomType._id), {
      boardType,
      nights: nights.length,
      nightlyRates: nightlyRates.map(({ night, amount }) => ({ night, amount })),
      total: nightlyRates.reduce((sum, rate) => sum + rate.amount, 0),
      currency: nightlyRates[0].currency,
    });
  }

  // Reservations and blocks both hold room nights, so one lookup finds
  // every room that is taken on any night of the stay.
  const takenRoomIds = await RoomNightModel.distinct("room", {
    night: { $gte: checkIn, $lt: checkOut },
  });

  const filterParams = new URLSearchParams(queryParams);
  for (const key of [...STAY_PARAMS, ...LOCKED_FIELDS]) {
    filterParams.delete(key);
  }

  try {
    const features = new ApiFeatures(
      RoomModel.find({
        isActive: true,
        roomType: { $in: [...pricingByRoomType.keys()] },
        _id: { $nin: takenRoomIds },
      }).sort({ floor: 1, number: 1 }),
      filterParams,
    )
      .filter()
      .skip()
      .limit();

    const rooms = await features.query.populate<{
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
      pricing: pricingByRoomType.get(room.roomType._id.toString())!,
    }));
  } catch (error) {
    if (error instanceof RangeError) {
      throw AppError.badRequest(error.message, {
        machineCode: MachineCode.INVALID_QUERY_PARAM,
      });
    }

    throw error;
  }
}
