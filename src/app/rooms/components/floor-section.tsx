import { RoomRow } from "@/src/app/rooms/components/room-row";
import type { FloorGroup } from "@/src/app/rooms/lib/rooms";

/** A floor heading followed by its rooms, separated by hairlines. */
export function FloorSection({ group }: { group: FloorGroup }) {
  const headingId = `floor-${group.floor}`;
  const count = group.rooms.length;

  return (
    <section aria-labelledby={headingId} className="scroll-mt-40">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-foreground/80 pb-3">
        <h2
          id={headingId}
          className="font-[family-name:var(--font-bodoni)] text-3xl"
        >
          Floor {group.floor}
        </h2>
        <p className="text-sm text-foreground/70">
          {count} {count === 1 ? "room" : "rooms"}
          {group.balcony && ", rooms with balcony"}
        </p>
      </div>
      <ul className="divide-y divide-border">
        {group.rooms.map((room) => (
          <RoomRow key={room.id} room={room} />
        ))}
      </ul>
    </section>
  );
}
