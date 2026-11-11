"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AvailableRoom } from "@domain/home/room";
import type { PackageId } from "@/src/app/home/data/sd";
import { BookingConfirmed } from "@/src/app/booking/components/booking-confirmed";
import { BookingSteps } from "@/src/app/booking/components/booking-steps";
import { BookingSummary } from "@/src/app/booking/components/booking-summary";
import { GuestsStep } from "@/src/app/booking/components/guests/guests-step";
import { ReviewStep } from "@/src/app/booking/components/review/review-step";
import { RoomStep } from "@/src/app/booking/components/room/room-step";
import { StayStep } from "@/src/app/booking/components/stay/stay-step";
import { sampleAvailability } from "@/src/app/booking/data/sample-availability";
import { stayError } from "@/src/app/booking/lib/pricing";
import type {
  BookingStep,
  ContactDetails,
  GuestDetails,
  PaymentDetails,
  StayDetails,
} from "@/src/app/booking/lib/types";

const EMPTY_GUEST: GuestDetails = {
  firstName: "",
  lastName: "",
  nationality: "TR",
  nationalId: "",
  passportNumber: "",
  country: "",
};

const EMPTY_PAYMENT: PaymentDetails = {
  method: "card",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  acceptTerms: false,
};

// Lets the home page search link here with the stay already filled in.
function stayFromParams(params: URLSearchParams): StayDetails {
  const guests = Number(params.get("guests"));
  const pkg = params.get("package");
  return {
    checkIn: params.get("checkIn") ?? "",
    checkOut: params.get("checkOut") ?? "",
    guests: guests >= 1 && guests <= 4 ? guests : 2,
    packageId: (pkg === "full-board" ? pkg : "all-inclusive") as PackageId,
  };
}

/** Keeps one form per guest, keeping what was typed when the count changes. */
function resizeGuests(guests: GuestDetails[], count: number) {
  return Array.from({ length: count }, (_, i) => guests[i] ?? EMPTY_GUEST);
}

export function BookingFlow() {
  const params = useSearchParams();
  const [stay, setStay] = useState(() => stayFromParams(params));
  const [step, setStep] = useState<BookingStep>(() =>
    stayError(stayFromParams(params)) ? "stay" : "room",
  );
  const [roomId, setRoomId] = useState<string | null>(null);
  const [guests, setGuests] = useState<GuestDetails[]>(() =>
    resizeGuests([], stayFromParams(params).guests),
  );
  const [contact, setContact] = useState<ContactDetails>({
    email: "",
    phone: "",
    requests: "",
  });
  const [payment, setPayment] = useState(EMPTY_PAYMENT);
  const [reference, setReference] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  // Sample data for now; fetch from /api/room/client/available instead.
  const rooms: AvailableRoom[] = useMemo(
    () => (stayError(stay) ? [] : sampleAvailability(stay)),
    [stay],
  );
  const room = rooms.find((r) => r.id === roomId) ?? null;

  const go = (next: BookingStep) => {
    setStep(next);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    top.current?.focus({ preventScroll: true });
  };

  const changeStay = (next: StayDetails) => {
    setStay(next);
    setGuests((current) => resizeGuests(current, next.guests));
  };

  if (reference) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <BookingConfirmed
          reference={reference}
          email={contact.email}
          method={payment.method}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6">
      <h1 className="font-[family-name:var(--font-bodoni)] text-5xl leading-tight">
        Book your stay
      </h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/75">
        Booking online is the cheapest way to stay with us: up to 23% off when
        you book three months ahead.
      </p>

      <div className="mt-10">
        <BookingSteps current={step} onSelect={go} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div ref={top} tabIndex={-1} className="scroll-mt-24 outline-none">
          {step === "stay" && (
            <StayStep
              stay={stay}
              onChange={changeStay}
              onNext={() => go("room")}
            />
          )}
          {step === "room" && (
            <RoomStep
              stay={stay}
              rooms={rooms}
              selectedId={room?.id ?? null}
              onSelect={(r) => setRoomId(r.id)}
              onBack={() => go("stay")}
              onNext={() => go("guests")}
            />
          )}
          {step === "guests" && (
            <GuestsStep
              guests={guests}
              contact={contact}
              onGuestsChange={setGuests}
              onContactChange={setContact}
              onBack={() => go("room")}
              onNext={() => go("review")}
            />
          )}
          {step === "review" && (
            <ReviewStep
              guests={guests}
              contact={contact}
              payment={payment}
              onPaymentChange={setPayment}
              onEditGuests={() => go("guests")}
              // The backend creates the reservation and returns its
              // reference; a made-up one stands in for the design.
              onConfirm={() => setReference("BH-26-48213")}
            />
          )}
        </div>

        <BookingSummary stay={stay} room={room} />
      </div>
    </div>
  );
}
