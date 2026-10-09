import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { connectToDatabase } from "@/db.js";
import { CleaningStatus, RoomType } from "@/models/enums.js";
import { RoomModel } from "@/models/room.model.js";

dotenv.config({
  path: path.resolve(fileURLToPath(import.meta.url), "../../../.env.dev"),
});

interface RoomLayout {
  floor: number;
  type: RoomType;
  count: number;
  beds: { single: number; double: number };
}

// Hotel layout from the project brief: 4 floors, no ground-floor rooms.
const ROOM_LAYOUT: RoomLayout[] = [
  {
    floor: 1,
    type: RoomType.SINGLE,
    count: 10,
    beds: { single: 1, double: 0 },
  },
  {
    floor: 1,
    type: RoomType.TRIPLE_SINGLES,
    count: 10,
    beds: { single: 3, double: 0 },
  },
  {
    floor: 2,
    type: RoomType.SINGLE,
    count: 10,
    beds: { single: 1, double: 0 },
  },
  { floor: 2, type: RoomType.TWIN, count: 10, beds: { single: 2, double: 0 } },
  {
    floor: 3,
    type: RoomType.DOUBLE,
    count: 10,
    beds: { single: 0, double: 1 },
  },
  {
    floor: 3,
    type: RoomType.TRIPLE_MIXED,
    count: 10,
    beds: { single: 1, double: 1 },
  },
  {
    floor: 4,
    type: RoomType.DOUBLE,
    count: 10,
    beds: { single: 0, double: 1 },
  },
  { floor: 4, type: RoomType.QUAD, count: 6, beds: { single: 2, double: 1 } },
  {
    floor: 4,
    type: RoomType.ROYAL_SUITE,
    count: 1,
    beds: { single: 0, double: 2 },
  },
];

function buildRooms() {
  const nextIndex = new Map<number, number>();

  return ROOM_LAYOUT.flatMap(({ floor, type, count, beds }) =>
    Array.from({ length: count }, () => {
      const index = (nextIndex.get(floor) ?? 0) + 1;
      nextIndex.set(floor, index);

      return {
        number: String(floor * 100 + index),
        floor,
        type,
        beds,
        hasBalcony: floor >= 3,
        hasMinibar: type !== RoomType.SINGLE,
        cleaningStatus: faker.helpers.weightedArrayElement([
          { weight: 8, value: CleaningStatus.CLEAN },
          { weight: 1, value: CleaningStatus.DIRTY },
          { weight: 1, value: CleaningStatus.IN_PROGRESS },
        ]),
      };
    }),
  );
}

// Idempotent: existing rooms (matched by number) are left untouched.
export async function seedRooms() {
  const rooms = buildRooms();

  const result = await RoomModel.bulkWrite(
    rooms.map((room) => ({
      updateOne: {
        filter: { number: room.number },
        update: { $setOnInsert: room },
        upsert: true,
      },
    })),
  );

  console.log(
    `Rooms seeded: ${result.upsertedCount} created, ${rooms.length - result.upsertedCount} already existed`,
  );
}

await connectToDatabase();
try {
  await seedRooms();
} finally {
  await mongoose.disconnect();
}
