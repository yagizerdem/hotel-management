import Image from "next/image";
import Link from "next/link";
import { BedDoubleIcon, UsersIcon } from "lucide-react";
import { RoomAmenities } from "@/src/app/rooms/components/room-amenities";
import {
  describeBeds,
  formatBoardType,
  formatPrice,
  type ListedRoom,
} from "@/src/app/rooms/lib/rooms";

const FALLBACK_IMAGE = "/images/hotels/room-1.jpg";

/** One room: photo, door-plaque number, what it has, and its rate. */
export function RoomRow({ room }: { room: ListedRoom }) {
  const { roomType, lowestRate } = room;
  const image = roomType.images[0] ?? FALLBACK_IMAGE;

  return (
    <li className="grid gap-6 py-8 md:grid-cols-[minmax(0,17.5rem)_1fr] lg:grid-cols-[17.5rem_1fr_13rem] lg:gap-8">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={`${roomType.name}, room ${room.number}`}
          fill
          sizes="(min-width: 768px) 280px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-[family-name:var(--font-bodoni)] text-4xl leading-none">
            Room {room.number}
          </h3>
          <span className="rounded-sm bg-[var(--stitch-tertiary-fixed)] px-2 py-0.5 text-xs text-[var(--stitch-on-tertiary-fixed)]">
            Floor {room.floor}
          </span>
        </div>
        <p className="mt-2 text-lg">{roomType.name}</p>
        {roomType.description && (
          <p className="mt-2 line-clamp-2 max-w-prose text-sm text-foreground/70">
            {roomType.description}
          </p>
        )}

        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <span className="flex items-center gap-1.5">
            <BedDoubleIcon aria-hidden className="size-4 text-foreground/60" />
            {describeBeds(roomType.beds)}
          </span>
          <span className="flex items-center gap-1.5">
            <UsersIcon aria-hidden className="size-4 text-foreground/60" />
            Sleeps {roomType.capacity}
          </span>
        </p>

        <div className="mt-4 border-t border-border pt-4">
          <RoomAmenities amenities={room.amenities} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:col-start-2 lg:col-start-auto lg:items-end lg:text-right">
        {lowestRate ? (
          <p>
            <span className="block text-sm text-foreground/70">From</span>
            <span className="font-[family-name:var(--font-bodoni)] text-3xl">
              {formatPrice(lowestRate)}
            </span>
            <span className="text-sm text-foreground/70"> / night</span>
            <span className="mt-1 block text-sm text-foreground/70">
              {formatBoardType(lowestRate.boardType)}
            </span>
          </p>
        ) : (
          <p className="text-sm text-foreground/70">
            Rates for this room aren&apos;t published yet.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:flex-col lg:items-end">
          <Link
            href={`/rooms/${room.id}#book`}
            className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-secondary/40 focus-visible:outline-none"
          >
            Book this room
          </Link>
          <Link
            href={`/rooms/${room.id}`}
            className="text-sm text-secondary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            See room details
          </Link>
        </div>
      </div>
    </li>
  );
}
