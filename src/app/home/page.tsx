import { Hero } from "@/src/app/home/components/hero";
import { EarlyBookingTimeline } from "@/src/app/home/components/early-booking-timeline";
import { FloorExplorer } from "@/src/app/home/components/floor-explorer";
import { PackageComparison } from "@/src/app/home/components/package-comparison";
import { RoomStandards } from "@/src/app/home/components/room-standards";
import { MembershipSignup } from "@/src/app/home/components/membership-signup";
import { getHotelRooms, getHotelRoomRates } from "@actions/room-actions";

export default async function HomePage() {
  const roomsResponse = await getHotelRooms();
  const roomRatesResponse = await getHotelRoomRates();

  // A failed action has no data, so the section falls back to empty lists.
  const rooms = roomsResponse.data ?? [];
  const roomRates = roomRatesResponse.data ?? [];

  return (
    <>
      <Hero />
      <EarlyBookingTimeline />
      <FloorExplorer rooms={rooms} roomRates={roomRates} />
      <PackageComparison />
      <RoomStandards />
      <MembershipSignup />
    </>
  );
}
