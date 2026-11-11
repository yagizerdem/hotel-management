"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, DoorOpenIcon } from "lucide-react";
import type {
  Room as RoomDomainModal,
  RoomRate as RoomRateDomainModel,
  RoomType as RoomTypeDomainModel,
} from "@domain/home/room";

interface FloorProps {
  rooms: RoomDomainModal[];
  roomRates: RoomRateDomainModel[];
}

/** One room type on a floor, with how many of its rooms are there. */
type FloorRoomType = {
  id: string;
  name: string;
  beds: string;
  capacity: number;
  count: number;
  minibar: boolean;
  lowestRate?: RoomRateDomainModel;
};

type Floor = {
  level: number;
  balcony: boolean;
  image?: string;
  rooms: FloorRoomType[];
};

function describeBeds({ single, double }: RoomTypeDomainModel["beds"]) {
  const parts = [];
  if (double) parts.push(`${double} double ${double === 1 ? "bed" : "beds"}`);
  if (single) parts.push(`${single} single ${single === 1 ? "bed" : "beds"}`);
  return parts.join(" and ");
}

function formatPrice({ nightlyPrice, currency }: RoomRateDomainModel) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(nightlyPrice);
}

/** The cheapest rate of each room type, keyed by room type id. */
function lowestRates(roomRates: RoomRateDomainModel[]) {
  const lowest = new Map<string, RoomRateDomainModel>();
  for (const rate of roomRates) {
    const current = lowest.get(rate.roomType.id);
    if (!current || rate.nightlyPrice < current.nightlyPrice) {
      lowest.set(rate.roomType.id, rate);
    }
  }
  return lowest;
}

/** Groups the rooms by floor and room type, top floor first. */
function toFloors(
  rooms: RoomDomainModal[],
  roomRates: RoomRateDomainModel[],
): Floor[] {
  const rates = lowestRates(roomRates);
  const floors = new Map<number, Floor>();

  for (const room of rooms) {
    let floor = floors.get(room.floor);
    if (!floor) {
      floor = { level: room.floor, balcony: false, rooms: [] };
      floors.set(room.floor, floor);
    }
    floor.balcony ||= room.amenities.balcony;
    floor.image ??= room.roomType.images[0];

    let roomType = floor.rooms.find((r) => r.id === room.roomType.id);
    if (!roomType) {
      roomType = {
        id: room.roomType.id,
        name: room.roomType.name,
        beds: describeBeds(room.roomType.beds),
        capacity: room.roomType.capacity,
        count: 0,
        minibar: false,
        lowestRate: rates.get(room.roomType.id),
      };
      floor.rooms.push(roomType);
    }
    roomType.count += 1;
    roomType.minibar ||= room.amenities.minibar;
  }

  return [...floors.values()].sort((a, b) => b.level - a.level);
}

export function FloorExplorer({ rooms, roomRates }: FloorProps) {
  const floors = useMemo(() => toFloors(rooms, roomRates), [rooms, roomRates]);
  const [selectedLevel, setSelectedLevel] = useState(floors[0]?.level);
  const selected = floors.find((f) => f.level === selectedLevel);
  if (!selected) return null;
  const roomCount = selected.rooms.reduce((sum, r) => sum + r.count, 0);

  return (
    <section id="rooms" className="scroll-mt-16 bg-card py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Our rooms, floor by floor
        </h2>
        <p className="mt-4 max-w-xl text-foreground/70">
          Each of our four floors has its own room types. Pick a floor to see
          its rooms and what they include.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-3">
            <div
              role="group"
              aria-label="Choose a floor"
              className="flex flex-col gap-3"
            >
              {floors.map((floor) => {
                const active = floor.level === selectedLevel;
                return (
                  <button
                    key={floor.level}
                    type="button"
                    aria-pressed={active}
                    aria-controls="kat-paneli"
                    onClick={() => setSelectedLevel(floor.level)}
                    className={`group flex items-start justify-between gap-4 rounded-sm border bg-background p-5 text-left transition-colors focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none ${
                      active
                        ? "border-primary"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <span>
                      <span
                        className={`text-sm ${active ? "text-primary" : "text-secondary"}`}
                      >
                        {floor.balcony
                          ? "Rooms with balcony"
                          : "Close to the garden level"}
                      </span>
                      <span className="mt-1 block font-[family-name:var(--font-bodoni)] text-3xl">
                        Floor {floor.level}
                      </span>
                      <span className="mt-2 block text-sm text-foreground/70">
                        {floor.rooms
                          .map((r) => `${r.name} (${r.count})`)
                          .join(", ")}
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden
                      className={`mt-1 size-5 shrink-0 transition-transform ${
                        active
                          ? "-rotate-45 text-primary"
                          : "text-foreground/40 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="flex items-start gap-3 rounded-sm border border-dashed border-foreground/25 p-4 text-sm text-foreground/75">
              <DoorOpenIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
              There are no rooms on the ground floor; it holds the reception and
              shared spaces.
            </p>
          </div>

          <div
            id="kat-paneli"
            aria-live="polite"
            className="rounded-sm border border-border bg-background p-5 sm:p-8"
          >
            {selected.image && (
              <div className="relative mb-6 aspect-[16/9] overflow-hidden">
                <Image
                  key={selected.image}
                  src={selected.image}
                  alt={`A room on floor ${selected.level}`}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-[family-name:var(--font-bodoni)] text-3xl">
                Rooms on floor {selected.level}
              </h3>
              <span className="rounded-sm bg-secondary/10 px-2.5 py-1 text-sm text-secondary">
                {roomCount} rooms in total
              </span>
            </div>

            <ul className="mt-4 divide-y divide-border">
              {selected.rooms.map((room) => (
                <li
                  key={room.id}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-bodoni)] text-xl">
                        {room.name}
                      </span>
                      <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs">
                        {room.count} {room.count === 1 ? "room" : "rooms"}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-foreground/70">
                      {[
                        room.beds,
                        `Sleeps ${room.capacity}`,
                        room.minibar && "Minibar",
                        selected.balcony && "Balcony",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                  {room.lowestRate && (
                    <p className="shrink-0 text-sm text-foreground/70 sm:text-right">
                      From{" "}
                      <span className="font-semibold text-foreground">
                        {formatPrice(room.lowestRate)}
                      </span>{" "}
                      / night
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
