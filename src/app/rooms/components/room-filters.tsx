"use client";

import { ChevronDownIcon } from "lucide-react";
import type { RoomType } from "@domain/home/room";
import {
  DEFAULT_FILTERS,
  type RoomFilters as RoomFiltersModel,
  type RoomSort,
} from "@/src/app/rooms/lib/rooms";

const chipClassName =
  "h-9 rounded-sm border px-3 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none";

function chipState(active: boolean) {
  return active
    ? "border-foreground bg-foreground text-background"
    : "border-border bg-transparent hover:border-foreground/40";
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-foreground/70">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-full appearance-none rounded-sm border border-border bg-popover pr-8 pl-3 text-sm outline-none focus-visible:border-secondary"
        >
          {children}
        </select>
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-foreground/50"
        />
      </span>
    </label>
  );
}

type RoomFiltersProps = {
  filters: RoomFiltersModel;
  onChange: (filters: RoomFiltersModel) => void;
  floors: number[];
  roomTypes: RoomType[];
  maxCapacity: number;
};

export function RoomFilters({
  filters,
  onChange,
  floors,
  roomTypes,
  maxCapacity,
}: RoomFiltersProps) {
  const set = (patch: Partial<RoomFiltersModel>) =>
    onChange({ ...filters, ...patch });
  const isDefault = (
    Object.keys(DEFAULT_FILTERS) as (keyof RoomFiltersModel)[]
  ).every((key) => key === "sort" || filters[key] === DEFAULT_FILTERS[key]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <fieldset className="flex flex-col gap-1">
          <legend className="mb-1 text-xs text-foreground/70">Floor</legend>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={filters.floor === "all"}
              onClick={() => set({ floor: "all" })}
              className={`${chipClassName} ${chipState(filters.floor === "all")}`}
            >
              All floors
            </button>
            {floors.map((floor) => (
              <button
                key={floor}
                type="button"
                aria-pressed={filters.floor === floor}
                onClick={() => set({ floor })}
                className={`${chipClassName} ${chipState(filters.floor === floor)}`}
              >
                Floor {floor}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4 sm:flex">
          <Select
            label="Room type"
            value={filters.roomTypeId}
            onChange={(roomTypeId) => set({ roomTypeId })}
          >
            <option value="all">All room types</option>
            {roomTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>

          <Select
            label="Guests"
            value={String(filters.minGuests)}
            onChange={(value) => set({ minGuests: Number(value) })}
          >
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n === 1 ? "Any" : `${n} or more`}
              </option>
            ))}
          </Select>
        </div>

        <fieldset className="flex flex-col gap-1">
          <legend className="mb-1 text-xs text-foreground/70">Must have</legend>
          <div className="flex gap-2">
            {(
              [
                ["balcony", "Balcony"],
                ["minibar", "Minibar"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={filters[key]}
                onClick={() => set({ [key]: !filters[key] })}
                className={`${chipClassName} ${
                  filters[key]
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : chipState(false)
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {!isDefault && (
          <button
            type="button"
            onClick={() => onChange({ ...DEFAULT_FILTERS, sort: filters.sort })}
            className="h-9 text-sm text-secondary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="sm:w-48">
        <Select
          label="Sort by"
          value={filters.sort}
          onChange={(sort) => set({ sort: sort as RoomSort })}
        >
          <option value="number">Room number</option>
          <option value="price">Price, low to high</option>
        </Select>
      </div>
    </div>
  );
}
