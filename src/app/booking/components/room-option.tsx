import Image from "next/image";
import { BedDoubleIcon, CheckIcon, SunIcon, UsersIcon } from "lucide-react";
import type { AvailableRoom } from "@domain/home/room";
import { describeBeds } from "@/src/app/rooms/lib/rooms";
import { formatMoney, quoteFor } from "@/src/app/booking/lib/pricing";
import type { StayDetails } from "@/src/app/booking/lib/types";

type RoomTypeGroup = {
  typeId: string;
  rooms: AvailableRoom[];
};

type RoomOptionProps = {
  group: RoomTypeGroup;
  stay: StayDetails;
  selectedId: string | null;
  onSelect: (room: AvailableRoom) => void;
};

/** One room type with each of its free rooms as a choice. */
export function RoomOption({
  group,
  stay,
  selectedId,
  onSelect,
}: RoomOptionProps) {
  const [first] = group.rooms;
  const { roomType } = first;
  const image = roomType.images[0] ?? "/images/hotels/room-1.jpg";
  const cheapest = group.rooms
    .map((room) => quoteFor(room, stay))
    .sort((a, b) => a.total - b.total)[0];
  const left = group.rooms.length;

  return (
    <article className="grid gap-5 border border-border bg-popover md:grid-cols-[15rem_1fr]">
      <div className="relative aspect-[4/3] md:aspect-auto">
        <Image
          src={image}
          alt={roomType.name}
          fill
          sizes="(min-width: 768px) 240px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 p-5 md:pl-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-[family-name:var(--font-bodoni)] text-2xl">
              {roomType.name}
            </h3>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/75">
              <span className="flex items-center gap-1.5">
                <BedDoubleIcon aria-hidden className="size-4" />
                {describeBeds(roomType.beds)}
              </span>
              <span className="flex items-center gap-1.5">
                <UsersIcon aria-hidden className="size-4" />
                Sleeps {roomType.capacity}
              </span>
            </p>
          </div>
          <p className="text-right">
            <span className="block text-sm text-foreground/70">
              {cheapest.nights} {cheapest.nights === 1 ? "night" : "nights"}{" "}
              from
            </span>
            <span className="font-[family-name:var(--font-bodoni)] text-2xl tabular-nums">
              {formatMoney(cheapest.total, cheapest.currency)}
            </span>
            {cheapest.discountPercent > 0 && (
              <span className="block text-sm text-foreground/60 line-through tabular-nums">
                {formatMoney(cheapest.subtotal, cheapest.currency)}
              </span>
            )}
          </p>
        </div>

        {roomType.description && (
          <p className="max-w-prose text-sm text-foreground/70">
            {roomType.description}
          </p>
        )}

        <fieldset>
          <legend className="text-sm">
            <span className="font-medium">Choose a room</span>{" "}
            <span className={left <= 2 ? "text-primary" : "text-foreground/65"}>
              ({left === 1 ? "last one left" : `${left} free`})
            </span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.rooms.map((room) => {
              const selected = room.id === selectedId;
              return (
                <button
                  key={room.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(room)}
                  className={`flex min-h-12 items-center gap-2 rounded-sm border px-3 py-2 text-left text-sm transition-colors focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none ${
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  {selected && <CheckIcon aria-hidden className="size-4" />}
                  <span>
                    <span className="block font-medium">
                      Room {room.number}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs ${
                        selected ? "text-background/75" : "text-foreground/65"
                      }`}
                    >
                      Floor {room.floor}
                      {room.amenities.balcony && (
                        <>
                          , <SunIcon aria-hidden className="size-3" /> balcony
                        </>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
    </article>
  );
}

export type { RoomTypeGroup };
