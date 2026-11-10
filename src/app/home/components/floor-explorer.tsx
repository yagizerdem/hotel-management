"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, DoorOpenIcon } from "lucide-react";
import { floors, formatPrice } from "@/src/app/home/data/hotel";

export function FloorExplorer() {
  const [selectedLevel, setSelectedLevel] = useState(floors[0].level);
  const selected = floors.find((f) => f.level === selectedLevel)!;
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
                        {floor.balcony ? "Rooms with balcony" : "Close to the garden level"}
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
              There are no rooms on the ground floor; it holds the reception and shared spaces.
            </p>
          </div>

          <div
            id="kat-paneli"
            aria-live="polite"
            className="rounded-sm border border-border bg-background p-5 sm:p-8"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                key={selected.image}
                src={selected.image}
                alt={`A room on floor ${selected.level}`}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
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
                  <p className="shrink-0 text-sm text-foreground/70 sm:text-right">
                    From{" "}
                    <span className="font-semibold text-foreground">
                      {formatPrice(room.nightlyPrice)}
                    </span>{" "}
                    / night
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
