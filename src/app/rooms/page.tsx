import type { Metadata } from "next";
import { RoomList } from "@/src/app/rooms/components/room-list";
import { RoomsIntro } from "@/src/app/rooms/components/rooms-intro";
import { getHotelRooms, getHotelRoomRates } from "@actions/room-actions";

export const metadata: Metadata = {
  title: "Rooms, Bilge Hotel Kemer",
  description:
    "Every room at Bilge Hotel in Kemer, with its beds, amenities and nightly rate.",
};

export default async function RoomsPage() {
  const [roomsResponse, roomRatesResponse] = await Promise.all([
    getHotelRooms(),
    getHotelRoomRates(),
  ]);

  // A failed action has no data, so the page falls back to empty lists.
  const rooms = roomsResponse.data ?? [];
  const roomRates = roomRatesResponse.data ?? [];
  const floorCount = new Set(rooms.map((room) => room.floor)).size;

  return (
    <>
      <RoomsIntro roomCount={rooms.length} floorCount={floorCount} />
      <RoomList rooms={rooms} roomRates={roomRates} />
    </>
  );
}
