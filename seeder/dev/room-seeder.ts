import dotenv from "dotenv";
import { Room } from "../../src/models/room";
import mongoose from "mongoose";

dotenv.config({
  path: process.cwd() + "/.env.local",
});

const roomTypes = [
  "SINGLE",
  "DOUBLE_TWIN",
  "DOUBLE_DUBLE",
  "TRIPLE_SINGLE",
  "TRIPLE_MIXED",
  "QUAD",
  "KING_SUITE",
] as const;

function buildRoom(floor: number, roomNo: number) {
  const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];

  const bedMap = {
    SINGLE: { capacity: 1, beds: { single: 1, double: 0 } },
    DOUBLE_TWIN: { capacity: 2, beds: { single: 2, double: 0 } },
    DOUBLE_DUBLE: { capacity: 2, beds: { single: 0, double: 1 } },
    TRIPLE_SINGLE: { capacity: 3, beds: { single: 3, double: 0 } },
    TRIPLE_MIXED: { capacity: 3, beds: { single: 1, double: 1 } },
    QUAD: { capacity: 4, beds: { single: 4, double: 0 } },
    KING_SUITE: { capacity: 2, beds: { single: 0, double: 1 } },
  }[type];

  return {
    floor,
    number: `${floor}${String(roomNo).padStart(2, "0")}`,
    type,
    capacity: bedMap.capacity,
    beds: bedMap.beds,
    hasBalcony: Math.random() < 0.35,
    hasMinibar: Math.random() < 0.6,
    hasAirConditioner: true,
    hasTv: true,
    hasHairDryer: true,
    hasWifi: true,
    status: "AVAILABLE",
    isActive: true,
  };
}

async function seedRooms() {
  await mongoose.connect(process.env.MONGODB_URI!);

  await Room.deleteMany({});

  const rooms = [];

  for (let i = 1; i <= 25; i++) {
    const floor = Math.ceil(i / 5);
    const roomNo = ((i - 1) % 5) + 1;

    rooms.push(buildRoom(floor, roomNo));
  }

  await Room.insertMany(rooms);

  console.log("25 rooms seeded");
  await mongoose.disconnect();
}

seedRooms().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
