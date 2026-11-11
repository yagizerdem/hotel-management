"use client";

import { useState } from "react";
import { ClockIcon, SearchIcon } from "lucide-react";
import { packages, PackageId, hotel } from "@/src/app/home/data/sd";
import {
  countNights,
  getEarlyBookingDiscount,
} from "@/src/app/home/lib/discount";

const fieldClassName =
  "h-12 w-full rounded-sm border border-border bg-popover px-3 text-base text-foreground outline-none focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/25";

type Result =
  | { kind: "error"; message: string }
  | { kind: "ok"; nights: number; discount: number };

export function AvailabilitySearch() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [packageId, setPackageId] = useState<PackageId>("all-inclusive");
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setResult({
        kind: "error",
        message: "Check-in date can't be in the past.",
      });
      return;
    }
    const nights = countNights(start, end);
    if (nights < 1) {
      setResult({
        kind: "error",
        message: "Check-out must be at least one day after check-in.",
      });
      return;
    }

    setResult({
      kind: "ok",
      nights,
      discount: getEarlyBookingDiscount(start, packageId, today),
    });
  }

  const packageName = packages.find((p) => p.id === packageId)?.name;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Search available rooms"
      className="rounded-sm border border-border bg-background p-5 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
        <label className="flex flex-col gap-1.5 text-sm text-foreground/70">
          Check-in
          <input
            type="date"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-foreground/70">
          Check-out
          <input
            type="date"
            required
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-foreground/70">
          Guests
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={fieldClassName}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-foreground/70">
          Package
          <select
            value={packageId}
            onChange={(e) => setPackageId(e.target.value as PackageId)}
            className={fieldClassName}
          >
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none sm:col-span-2 lg:col-span-1"
        >
          <SearchIcon className="size-4" aria-hidden />
          Show available rooms
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-foreground/80">
          <ClockIcon className="size-4 text-secondary" aria-hidden />
          Check-in {hotel.checkIn}, check-out {hotel.checkOut}
        </p>
        <p aria-live="polite" className="text-foreground/80">
          {result?.kind === "error" && (
            <span className="text-primary">{result.message}</span>
          )}
          {result?.kind === "ok" &&
            (result.discount > 0 ? (
              <>
                {result.nights} {result.nights === 1 ? "night" : "nights"},{" "}
                {packageName}:{" "}
                <strong className="font-semibold text-primary">
                  {result.discount}% early booking discount
                </strong>{" "}
                applies.
              </>
            ) : (
              <>
                {result.nights} {result.nights === 1 ? "night" : "nights"},{" "}
                {packageName}: the standard nightly rate applies.
              </>
            ))}
        </p>
      </div>
    </form>
  );
}
