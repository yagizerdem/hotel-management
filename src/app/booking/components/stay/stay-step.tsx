"use client";

import { useState } from "react";
import { ClockIcon } from "lucide-react";
import { hotel } from "@/src/app/home/data/sd";
import { PackagePicker } from "@/src/app/booking/components/stay/package-picker";
import { stayError, toInputDate, today } from "@/src/app/booking/lib/pricing";
import type { StayDetails } from "@/src/app/booking/lib/types";
import {
  field,
  fieldError,
  fieldLabel,
  primaryButton,
} from "@/src/app/booking/lib/ui";

type StayStepProps = {
  stay: StayDetails;
  onChange: (stay: StayDetails) => void;
  onNext: () => void;
};

export function StayStep({ stay, onChange, onNext }: StayStepProps) {
  const [submitted, setSubmitted] = useState(false);
  const error = stayError(stay);
  const set = (patch: Partial<StayDetails>) => onChange({ ...stay, ...patch });
  const min = toInputDate(today());

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (!error) onNext();
      }}
      className="flex flex-col gap-8"
    >
      <div>
        <h2 className="font-[family-name:var(--font-bodoni)] text-3xl">
          When are you coming?
        </h2>
        <p className="mt-2 flex items-center gap-2 text-sm text-foreground/70">
          <ClockIcon aria-hidden className="size-4" />
          Check-in from {hotel.checkIn}, check-out by {hotel.checkOut}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Check-in</span>
          <input
            type="date"
            min={min}
            value={stay.checkIn}
            onChange={(event) => set({ checkIn: event.target.value })}
            aria-invalid={submitted && !!error}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Check-out</span>
          <input
            type="date"
            min={stay.checkIn || min}
            value={stay.checkOut}
            onChange={(event) => set({ checkOut: event.target.value })}
            aria-invalid={submitted && !!error}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Guests</span>
          <select
            value={stay.guests}
            onChange={(event) => set({ guests: Number(event.target.value) })}
            className={field}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
      </div>
      {submitted && error && (
        <p role="alert" className={`-mt-4 ${fieldError}`}>
          {error}
        </p>
      )}

      <PackagePicker
        value={stay.packageId}
        onChange={(packageId) => set({ packageId })}
      />

      <div className="flex justify-end border-t border-border pt-6">
        <button type="submit" className={primaryButton}>
          See available rooms
        </button>
      </div>
    </form>
  );
}
