import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingFlow } from "@/src/app/booking/components/booking-flow";

export const metadata: Metadata = {
  title: "Book your stay, Bilge Hotel Kemer",
  description:
    "Book a room at Bilge Hotel in Kemer online and save up to 23% when you book early.",
};

export default function BookingPage() {
  // The flow reads the search query, which needs a Suspense boundary.
  return (
    <Suspense>
      <BookingFlow />
    </Suspense>
  );
}
