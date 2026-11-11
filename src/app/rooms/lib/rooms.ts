import type { Room, RoomRate, RoomType } from "@domain/home/room";

export type RoomSort = "number" | "price";

export type RoomFilters = {
  floor: number | "all";
  roomTypeId: string | "all";
  minGuests: number;
  balcony: boolean;
  minibar: boolean;
  sort: RoomSort;
};

export const DEFAULT_FILTERS: RoomFilters = {
  floor: "all",
  roomTypeId: "all",
  minGuests: 1,
  balcony: false,
  minibar: false,
  sort: "number",
};

/** A room with the cheapest current rate of its room type, if there is one. */
export type ListedRoom = Room & { lowestRate?: RoomRate };

export type FloorGroup = {
  floor: number;
  rooms: ListedRoom[];
  balcony: boolean;
};

export function describeBeds({ single, double }: RoomType["beds"]) {
  const parts = [];
  if (double) parts.push(`${double} double ${double === 1 ? "bed" : "beds"}`);
  if (single) parts.push(`${single} single ${single === 1 ? "bed" : "beds"}`);
  return parts.join(" and ");
}

export function formatPrice({ nightlyPrice, currency }: RoomRate) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(nightlyPrice);
}

export function formatBoardType(boardType: string) {
  const label = boardType.replace(/[-_]/g, " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** Attaches the cheapest rate of each room's type to the room. */
export function withLowestRates(
  rooms: Room[],
  roomRates: RoomRate[],
): ListedRoom[] {
  const lowest = new Map<string, RoomRate>();
  for (const rate of roomRates) {
    const current = lowest.get(rate.roomType.id);
    if (!current || rate.nightlyPrice < current.nightlyPrice) {
      lowest.set(rate.roomType.id, rate);
    }
  }
  return rooms.map((room) => ({
    ...room,
    lowestRate: lowest.get(room.roomType.id),
  }));
}

/** Each room type once, in the order they first appear. */
export function uniqueRoomTypes(rooms: Room[]) {
  const types = new Map<string, RoomType>();
  for (const room of rooms) types.set(room.roomType.id, room.roomType);
  return [...types.values()].sort((a, b) => a.capacity - b.capacity);
}

export function uniqueFloors(rooms: Room[]) {
  return [...new Set(rooms.map((room) => room.floor))].sort((a, b) => b - a);
}

export function applyFilters(rooms: ListedRoom[], filters: RoomFilters) {
  return rooms.filter(
    (room) =>
      (filters.floor === "all" || room.floor === filters.floor) &&
      (filters.roomTypeId === "all" ||
        room.roomType.id === filters.roomTypeId) &&
      room.roomType.capacity >= filters.minGuests &&
      (!filters.balcony || room.amenities.balcony) &&
      (!filters.minibar || room.amenities.minibar),
  );
}

// Rooms without a rate sort last when sorting by price.
function compareRooms(sort: RoomSort) {
  return (a: ListedRoom, b: ListedRoom) => {
    if (sort === "price") {
      const priceA = a.lowestRate?.nightlyPrice ?? Infinity;
      const priceB = b.lowestRate?.nightlyPrice ?? Infinity;
      if (priceA !== priceB) return priceA - priceB;
    }
    return a.number.localeCompare(b.number, undefined, { numeric: true });
  };
}

/** Groups the rooms by floor, top floor first, sorted within each floor. */
export function groupByFloor(rooms: ListedRoom[], sort: RoomSort) {
  const groups = new Map<number, FloorGroup>();
  for (const room of rooms) {
    let group = groups.get(room.floor);
    if (!group) {
      group = { floor: room.floor, rooms: [], balcony: false };
      groups.set(room.floor, group);
    }
    group.rooms.push(room);
    group.balcony ||= room.amenities.balcony;
  }
  const sorted = [...groups.values()].sort((a, b) => b.floor - a.floor);
  for (const group of sorted) group.rooms.sort(compareRooms(sort));
  return sorted;
}
