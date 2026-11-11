// Placeholder availability so the booking page can be designed before it is
// wired up. Replace with GET /api/room/client/available, which returns the
// same AvailableRoom shape for the searched stay.

import type { AvailableRoom } from "@domain/home/room";
import { sampleRooms, sampleRoomRates } from "@/src/app/rooms/data/sample-rooms";
import { countNights } from "@/src/app/home/lib/discount";
import { parseDate } from "@/src/app/booking/lib/pricing";
import type { StayDetails } from "@/src/app/booking/lib/types";

// All inclusive costs more per night than full board.
const ALL_INCLUSIVE_FACTOR = 1.3;

// Rooms that are taken in the sample, so the list isn't every room.
const BOOKED = new Set(["room-301", "room-202"]);

export function sampleAvailability(stay: StayDetails): AvailableRoom[] {
  const start = parseDate(stay.checkIn);
  const nights = countNights(start, parseDate(stay.checkOut));
  const factor = stay.packageId === "all-inclusive" ? ALL_INCLUSIVE_FACTOR : 1;

  return sampleRooms
    .filter(
      (room) => !BOOKED.has(room.id) && room.roomType.capacity >= stay.guests,
    )
    .flatMap((room) => {
      const rate = sampleRoomRates.find((r) => r.roomType.id === room.roomType.id);
      if (!rate) return [];
      const nightlyRates = Array.from({ length: nights }, (_, i) => {
        const night = new Date(start);
        night.setDate(start.getDate() + i);
        // Friday and Saturday nights cost a little more.
        const weekend = night.getDay() === 5 || night.getDay() === 6;
        const amount = Math.round(rate.nightlyPrice * factor * (weekend ? 1.1 : 1));
        return { night, amount };
      });
      return [
        {
          ...room,
          pricing: {
            boardType: stay.packageId,
            nights,
            nightlyRates,
            total: nightlyRates.reduce((sum, n) => sum + n.amount, 0),
            currency: rate.currency,
          },
        },
      ];
    });
}
