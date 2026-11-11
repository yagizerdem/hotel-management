import Link from "next/link";
import { BedDoubleIcon, UsersIcon } from "lucide-react";
import type { AvailableRoom } from "@domain/home/room";
import { describeBeds } from "@/src/app/rooms/lib/rooms";

type AvailableRoomsProps = {
  rooms: AvailableRoom[];
  search: {
    checkIn: string;
    checkOut: string;
    guests: string;
    boardType: string;
  };
};

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** The rooms a search found, each with its stay price and a booking link. */
export function AvailableRooms({ rooms, search }: AvailableRoomsProps) {
  if (rooms.length === 0) {
    return (
      <p className="mt-4 border-t border-border pt-4 text-sm text-foreground/80">
        No rooms are free for these dates. Try other dates or fewer guests.
      </p>
    );
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-sm text-foreground/80">
        {rooms.length} {rooms.length === 1 ? "room is" : "rooms are"} free for
        your stay.
      </p>
      <ul className="mt-2 divide-y divide-border">
        {rooms.map((room) => {
          const { roomType, pricing } = room;
          const bookingHref = `/booking?${new URLSearchParams({
            roomId: room.id,
            ...search,
          })}`;

          return (
            <li key={room.id} className="py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-[family-name:var(--font-bodoni)] text-2xl">
                      Room {room.number}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {roomType.name}, floor {room.floor}
                    </span>
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <span className="flex items-center gap-1.5">
                      <BedDoubleIcon
                        aria-hidden
                        className="size-4 text-foreground/60"
                      />
                      {describeBeds(roomType.beds)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <UsersIcon
                        aria-hidden
                        className="size-4 text-foreground/60"
                      />
                      Sleeps {roomType.capacity}
                    </span>
                  </p>
                </div>
                <p className="shrink-0 text-sm text-foreground/70 sm:text-right">
                  <span className="font-semibold text-foreground">
                    {formatAmount(pricing.total, pricing.currency)}
                  </span>{" "}
                  for {pricing.nights}{" "}
                  {pricing.nights === 1 ? "night" : "nights"}
                  <span className="block">before any discount</span>
                </p>
              </div>

              <Link
                href={bookingHref}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
              >
                Go to booking
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
