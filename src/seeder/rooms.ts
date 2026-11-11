import RoomModel from "@models/room";
import RoomTypeModel from "@models/room-type";

const ROOM_TYPES = [
  {
    code: "single",
    name: "Tek kişilik oda",
    description: "Tek yataklı, tek kişilik oda.",
    capacity: 1,
    beds: { single: 1, double: 0 },
  },
  {
    code: "twin",
    name: "İki yataklı oda",
    description: "İki tek kişilik yataklı oda.",
    capacity: 2,
    beds: { single: 2, double: 0 },
  },
  {
    code: "triple-twin",
    name: "Üç yataklı oda",
    description: "Üç tek kişilik yataklı oda.",
    capacity: 3,
    beds: { single: 3, double: 0 },
  },
  {
    code: "double",
    name: "Duble oda",
    description: "Bir çift kişilik yataklı oda.",
    capacity: 2,
    beds: { single: 0, double: 1 },
  },
  {
    code: "triple",
    name: "Üç kişilik oda",
    description: "Bir çift kişilik ve bir tek kişilik yataklı oda.",
    capacity: 3,
    beds: { single: 1, double: 1 },
  },
  {
    code: "family",
    name: "Dört kişilik aile odası",
    description: "Bir çift kişilik ve iki tek kişilik yataklı oda.",
    capacity: 4,
    beds: { single: 2, double: 1 },
  },
  {
    code: "king-suite",
    name: "Kral dairesi",
    description: "Otelin en geniş ve en özel dairesi.",
    capacity: 2,
    beds: { single: 0, double: 1 },
  },
];

// Room layout from the project scope. There are no rooms on the ground floor.
const FLOOR_PLAN = [
  { floor: 1, roomType: "single", count: 10 },
  { floor: 1, roomType: "triple-twin", count: 10 },
  { floor: 2, roomType: "single", count: 10 },
  { floor: 2, roomType: "twin", count: 10 },
  { floor: 3, roomType: "double", count: 10 },
  { floor: 3, roomType: "triple", count: 10 },
  { floor: 4, roomType: "double", count: 10 },
  { floor: 4, roomType: "family", count: 6 },
  { floor: 4, roomType: "king-suite", count: 1 },
];

export async function seedRooms() {
  const roomTypes = await RoomTypeModel.insertMany(ROOM_TYPES);
  const roomTypeByCode = new Map(roomTypes.map((roomType) => [roomType.code, roomType]));

  const nextNumberOnFloor = new Map<number, number>();
  const rooms = FLOOR_PLAN.flatMap(({ floor, roomType, count }) =>
    Array.from({ length: count }, () => {
      const index = (nextNumberOnFloor.get(floor) ?? 0) + 1;
      nextNumberOnFloor.set(floor, index);

      return {
        number: `${floor}${String(index).padStart(2, "0")}`,
        floor,
        roomType: roomTypeByCode.get(roomType)!._id,
        amenities: {
          // Rooms on the 3rd and 4th floors have a balcony.
          balcony: floor >= 3,
          // Every room except the single rooms has a minibar.
          minibar: roomType !== "single",
          airConditioning: true,
          tv: true,
          hairDryer: true,
          wifi: true,
        },
      };
    }),
  );

  return { roomTypes, rooms: await RoomModel.insertMany(rooms) };
}
