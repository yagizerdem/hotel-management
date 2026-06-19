import dotenv from "dotenv";
import { Room } from "../../src/models/room";
import mongoose from "mongoose";

dotenv.config({
  path: process.cwd() + "/.env.local",
});

function formatRoomType(type: (typeof roomTypes)[number]) {
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getFloorText(floor: number) {
  if (floor === 1) {
    return "Located on the first floor, this room offers quick access to the lobby and hotel facilities.";
  }

  if (floor === 2 || floor === 3) {
    return `Located on floor ${floor}, this room offers a balanced stay with a calm atmosphere and easy access to shared areas.`;
  }

  return `Located on one of the upper floors, this room provides a quieter and more private accommodation experience.`;
}

function getTypeText(type: (typeof roomTypes)[number]) {
  switch (type) {
    case "SINGLE":
      return "Designed for solo guests, it provides a practical and comfortable space for short or business stays.";

    case "DOUBLE_TWIN":
      return "A comfortable twin room with two separate beds, ideal for friends, colleagues, or guests who prefer separate sleeping areas.";

    case "DOUBLE_DUBLE":
      return "A cozy double room with one large bed, suitable for couples or guests looking for a more relaxed stay.";

    case "TRIPLE_SINGLE":
      return "A spacious room with three single beds, ideal for small groups or family members staying together.";

    case "TRIPLE_MIXED":
      return "A flexible triple room with both single and double bed options, suitable for families or mixed guest groups.";

    case "QUAD":
      return "A large room designed for up to four guests, making it a strong option for families or group stays.";

    case "KING_SUITE":
      return "A premium suite with a king-style sleeping area, offering extra comfort, more space, and a more refined stay.";

    default:
      return "A comfortable room designed for a relaxing hotel stay.";
  }
}

function getAmenityText(room: {
  hasBalcony: boolean;
  hasMinibar: boolean;
  hasAirConditioner: boolean;
  hasTv: boolean;
  hasHairDryer: boolean;
  hasWifi: boolean;
}) {
  const amenities: string[] = [];

  if (room.hasWifi) amenities.push("free Wi-Fi");
  if (room.hasAirConditioner) amenities.push("air conditioning");
  if (room.hasTv) amenities.push("TV");
  if (room.hasMinibar) amenities.push("minibar");
  if (room.hasHairDryer) amenities.push("hair dryer");
  if (room.hasBalcony) amenities.push("a private balcony");

  if (amenities.length === 0) {
    return "Essential room features are provided for a simple and comfortable stay.";
  }

  const last = amenities.pop();

  if (amenities.length === 0) {
    return `The room includes ${last}.`;
  }

  return `The room includes ${amenities.join(", ")} and ${last}.`;
}

function buildRoomDescription(room: {
  type: (typeof roomTypes)[number];
  floor: number;
  capacity: number;
  beds: {
    single: number;
    double: number;
  };
  hasBalcony: boolean;
  hasMinibar: boolean;
  hasAirConditioner: boolean;
  hasTv: boolean;
  hasHairDryer: boolean;
  hasWifi: boolean;
}) {
  const roomType = formatRoomType(room.type);

  return `${roomType}. ${getTypeText(room.type)} ${getFloorText(room.floor)} It can accommodate up to ${room.capacity} guest${
    room.capacity > 1 ? "s" : ""
  }. ${getAmenityText(room)}`;
}

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

    const room = buildRoom(floor, roomNo);

    rooms.push({
      ...room,
      description: buildRoomDescription(room),
    });
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
