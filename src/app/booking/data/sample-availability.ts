// Placeholder availability so the booking page can be designed before it is
// wired up. Replace with GET /api/room/client/available, which returns the
// same AvailableRoom shape for the searched stay.

import type { AvailableRoom, Room, RoomType } from "@domain/home/room";
import { countNights } from "@/src/app/home/lib/discount";
import { parseDate } from "@/src/app/booking/lib/pricing";
import type { StayDetails } from "@/src/app/booking/lib/types";

function roomType(
  code: string,
  name: string,
  description: string,
  capacity: number,
  beds: RoomType["beds"],
  image: string,
): RoomType {
  return {
    id: `type-${code}`,
    code,
    name,
    description,
    capacity,
    beds,
    images: [image],
  };
}

const single = roomType(
  "single",
  "Single room",
  "A quiet room for one, facing the pine slopes, with a work desk and a rain shower.",
  1,
  { single: 1, double: 0 },
  "/images/hotels/room-1.jpg",
);
const double = roomType(
  "double",
  "Double room",
  "Light-filled room with a large double bed and a seating corner by the window.",
  2,
  { single: 0, double: 1 },
  "/images/hotels/room-2.jpg",
);
const triple = roomType(
  "triple",
  "Triple room",
  "A double bed and a single bed, suited to small families.",
  3,
  { single: 1, double: 1 },
  "/images/hotels/room-3.jpg",
);
const family = roomType(
  "family",
  "Family room",
  "Room for four with a double bed, two single beds and a view over the bay.",
  4,
  { single: 2, double: 1 },
  "/images/hotels/suite-1.jpg",
);

// Nightly full-board price of each room type, in euros.
const NIGHTLY: Record<string, number> = {
  [single.id]: 95,
  [double.id]: 140,
  [triple.id]: 185,
  [family.id]: 260,
};

// All inclusive costs more per night than full board.
const ALL_INCLUSIVE_FACTOR = 1.3;

function room(number: string, floor: number, type: RoomType): Room {
  // Rooms on floors 3 and 4 have a balcony; every room but singles has a
  // minibar, as the hotel describes them.
  return {
    id: `room-${number}`,
    number,
    floor,
    roomTypeId: type.id,
    roomType: type,
    amenities: {
      balcony: floor >= 3,
      minibar: type.id !== single.id,
      airConditioning: true,
      tv: true,
      hairDryer: true,
      wifi: true,
    },
  };
}

// The rooms that are free in the sample.
const FREE_ROOMS: Room[] = [
  room("104", 1, single),
  room("112", 1, triple),
  room("115", 1, triple),
  room("207", 2, single),
  room("305", 3, double),
  room("309", 3, double),
  room("314", 3, triple),
  room("402", 4, double),
  room("412", 4, family),
];

export function sampleAvailability(stay: StayDetails): AvailableRoom[] {
  const start = parseDate(stay.checkIn);
  const nights = countNights(start, parseDate(stay.checkOut));
  const factor = stay.packageId === "all-inclusive" ? ALL_INCLUSIVE_FACTOR : 1;

  return FREE_ROOMS.filter((r) => r.roomType.capacity >= stay.guests).map(
    (r) => {
      const nightlyRates = Array.from({ length: nights }, (_, i) => {
        const night = new Date(start);
        night.setDate(start.getDate() + i);
        // Friday and Saturday nights cost a little more.
        const weekend = night.getDay() === 5 || night.getDay() === 6;
        const amount = Math.round(
          NIGHTLY[r.roomType.id] * factor * (weekend ? 1.1 : 1),
        );
        return { night, amount };
      });
      return {
        ...r,
        pricing: {
          boardType: stay.packageId,
          nights,
          nightlyRates,
          total: nightlyRates.reduce((sum, n) => sum + n.amount, 0),
          currency: "EUR",
        },
      };
    },
  );
}
