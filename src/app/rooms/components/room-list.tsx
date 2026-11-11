"use client";

import { useMemo, useState } from "react";
import type { Room, RoomRate } from "@domain/home/room";
import { FloorSection } from "@/src/app/rooms/components/floor-section";
import { RoomFilters } from "@/src/app/rooms/components/room-filters";
import { RoomsEmpty } from "@/src/app/rooms/components/rooms-empty";
import {
  DEFAULT_FILTERS,
  applyFilters,
  groupByFloor,
  uniqueFloors,
  uniqueRoomTypes,
  withLowestRates,
} from "@/src/app/rooms/lib/rooms";

type RoomListProps = {
  rooms: Room[];
  roomRates: RoomRate[];
};

/** The filter bar and every room that matches it, grouped by floor. */
export function RoomList({ rooms, roomRates }: RoomListProps) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const listed = useMemo(
    () => withLowestRates(rooms, roomRates),
    [rooms, roomRates],
  );
  const floors = useMemo(() => uniqueFloors(rooms), [rooms]);
  const roomTypes = useMemo(() => uniqueRoomTypes(rooms), [rooms]);
  const maxCapacity = Math.max(1, ...roomTypes.map((type) => type.capacity));

  const matching = useMemo(
    () => applyFilters(listed, filters),
    [listed, filters],
  );
  const groups = useMemo(
    () => groupByFloor(matching, filters.sort),
    [matching, filters.sort],
  );

  if (rooms.length === 0) {
    return (
      <RoomsEmpty
        title="No rooms to show yet"
        body="Rooms appear here once they're added in the management panel."
      />
    );
  }

  return (
    <>
      {/* Sticky only on wide screens, where the bar is one row; on phones it
          would cover too much of the list. */}
      <div className="z-30 border-y border-border bg-background py-4 lg:sticky lg:top-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RoomFilters
            filters={filters}
            onChange={setFilters}
            floors={floors}
            roomTypes={roomTypes}
            maxCapacity={maxCapacity}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 pb-24 sm:px-6">
        <p aria-live="polite" className="text-sm text-foreground/70">
          Showing {matching.length} of {rooms.length} rooms
        </p>

        {groups.length === 0 ? (
          <RoomsEmpty
            title="No rooms match these filters"
            body="Try another floor or room type, or clear the filters to see every room."
            onClear={() =>
              setFilters({ ...DEFAULT_FILTERS, sort: filters.sort })
            }
          />
        ) : (
          <div className="mt-10 flex flex-col gap-16">
            {groups.map((group) => (
              <FloorSection key={group.floor} group={group} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
