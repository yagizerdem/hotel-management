import { Hero } from "./_components/hero";
import { EarlyBookingTimeline } from "./_components/early-booking-timeline";
import { FloorExplorer } from "./_components/floor-explorer";
import { PackageComparison } from "./_components/package-comparison";
import { RoomStandards } from "./_components/room-standards";
import { MembershipSignup } from "./_components/membership-signup";

export default function HomePage() {
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
