import {
  RefrigeratorIcon,
  SnowflakeIcon,
  SunIcon,
  TvIcon,
  WifiIcon,
  WindIcon,
  type LucideIcon,
} from "lucide-react";

const standards: { icon: LucideIcon; name: string; note: string }[] = [
  { icon: SnowflakeIcon, name: "Air conditioning", note: "In every room" },
  { icon: TvIcon, name: "TV", note: "In every room" },
  { icon: WindIcon, name: "Hair dryer", note: "In every room" },
  { icon: WifiIcon, name: "Wi-Fi", note: "In every room" },
  { icon: RefrigeratorIcon, name: "Minibar", note: "All rooms except singles" },
  { icon: SunIcon, name: "Balcony", note: "Rooms on floors 3 and 4" },
];

export function RoomStandards() {
  return (
    <section
      id="amenities"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-24 sm:px-6"
    >
      <h2 className="border-b border-border pb-6 font-[family-name:var(--font-bodoni)] text-3xl">
        Standard in every room
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {standards.map(({ icon: Icon, name, note }) => (
          <li key={name} className="flex gap-3">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-secondary" />
            <span>
              <span className="block font-medium">{name}</span>
              <span className="block text-sm text-foreground/65">{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
