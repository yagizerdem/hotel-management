"use client";
import { Hero } from "@/src/app/home/components/hero";
import { EarlyBookingTimeline } from "@/src/app/home/components/early-booking-timeline";
import { FloorExplorer } from "@/src/app/home/components/floor-explorer";
import { PackageComparison } from "@/src/app/home/components/package-comparison";
import { RoomStandards } from "@/src/app/home/components/room-standards";
import { MembershipSignup } from "@/src/app/home/components/membership-signup";

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
