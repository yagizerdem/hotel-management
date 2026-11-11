"use client";

import { useMemo, useState } from "react";
import type { AvailableRoom } from "@domain/home/room";
import { packages } from "@/src/app/home/data/sd";
import {
  RoomOption,
  type RoomTypeGroup,
} from "@/src/app/booking/components/room-option";
import { formatStayDate } from "@/src/app/booking/lib/pricing";
import type { StayDetails } from "@/src/app/booking/lib/types";
import {
  fieldError,
  primaryButton,
  textAction,
} from "@/src/app/booking/lib/ui";

type RoomStepProps = {
  stay: StayDetails;
  rooms: AvailableRoom[];
  selectedId: string | null;
  onSelect: (room: AvailableRoom) => void;
  onBack: () => void;
  onNext: () => void;
};

function groupByType(rooms: AvailableRoom[]): RoomTypeGroup[] {
  const groups = new Map<string, AvailableRoom[]>();
  for (const room of rooms) {
    const list = groups.get(room.roomType.id) ?? [];
    list.push(room);
    groups.set(room.roomType.id, list);
  }
  return [...groups.entries()]
    .map(([typeId, list]) => ({
      typeId,
      rooms: list.sort((a, b) =>
        a.number.localeCompare(b.number, undefined, { numeric: true }),
      ),
    }))
    .sort((a, b) => a.rooms[0].pricing.total - b.rooms[0].pricing.total);
}

export function RoomStep({
  stay,
  rooms,
  selectedId,
  onSelect,
  onBack,
  onNext,
}: RoomStepProps) {
  const [submitted, setSubmitted] = useState(false);
  const groups = useMemo(() => groupByType(rooms), [rooms]);
  const packageName = packages.find((p) => p.id === stay.packageId)?.name;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-bodoni)] text-3xl">
            Choose your room
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            {formatStayDate(stay.checkIn)} to {formatStayDate(stay.checkOut)},{" "}
            {stay.guests} {stay.guests === 1 ? "guest" : "guests"},{" "}
            {packageName?.toLowerCase()}.
          </p>
        </div>
        <button type="button" onClick={onBack} className={textAction}>
          Change dates or package
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="border border-dashed border-foreground/30 p-8">
          <h3 className="font-[family-name:var(--font-bodoni)] text-2xl">
            No rooms are free for these dates
          </h3>
          <p className="mt-2 max-w-md text-sm text-foreground/70">
            Try other dates, or fewer guests per room. You can also call us and
            we&apos;ll look for an option.
          </p>
          <button
            type="button"
            onClick={onBack}
            className={`mt-4 ${textAction}`}
          >
            Change dates
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <RoomOption
              key={group.typeId}
              group={group}
              stay={stay}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      {submitted && !selectedId && (
        <p role="alert" className={fieldError}>
          Choose a room to continue.
        </p>
      )}

      {groups.length > 0 && (
        <div className="flex justify-end border-t border-border pt-6">
          <button
            type="button"
            onClick={() => {
              setSubmitted(true);
              if (selectedId) onNext();
            }}
            className={primaryButton}
          >
            Continue to guest details
          </button>
        </div>
      )}
    </div>
  );
}
