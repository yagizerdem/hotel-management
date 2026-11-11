import { Hero } from "@/src/app/home/components/hero";
import { EarlyBookingTimeline } from "@/src/app/home/components/early-booking-timeline";
import { FloorExplorer } from "@/src/app/home/components/floor-explorer";
import { PackageComparison } from "@/src/app/home/components/package-comparison";
import { RoomStandards } from "@/src/app/home/components/room-standards";
import { MembershipSignup } from "@/src/app/home/components/membership-signup";
import { getHotelRooms } from "@actions/room-actions";

export default async function HomePage() {
  const rooms = await getHotelRooms();

  console.log(rooms);

  return (
    <>
      <Hero />
      <EarlyBookingTimeline />
      <FloorExplorer />
      <PackageComparison />
      <RoomStandards />
      <MembershipSignup />
    </>
  );
}
