import {
  RefrigeratorIcon,
  SnowflakeIcon,
  SunIcon,
  TvIcon,
  WifiIcon,
  WindIcon,
  type LucideIcon,
} from "lucide-react";
import type { RoomAmenities as RoomAmenitiesModel } from "@domain/home/room";

const AMENITIES: {
  key: keyof RoomAmenitiesModel;
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "wifi", label: "Wi-Fi", icon: WifiIcon },
  { key: "airConditioning", label: "Air conditioning", icon: SnowflakeIcon },
  { key: "tv", label: "TV", icon: TvIcon },
  { key: "hairDryer", label: "Hair dryer", icon: WindIcon },
  { key: "minibar", label: "Minibar", icon: RefrigeratorIcon },
  { key: "balcony", label: "Balcony", icon: SunIcon },
];

/**
 * Every amenity in the same order on every room, with the missing ones
 * struck through, so rooms can be compared down the list at a glance.
 */
export function RoomAmenities({
  amenities,
}: {
  amenities: RoomAmenitiesModel;
}) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {AMENITIES.map(({ key, label, icon: Icon }) => {
        const has = amenities[key];
        return (
          <li
            key={key}
            className={`flex items-center gap-1.5 ${
              has ? "text-foreground" : "text-foreground/40 line-through"
            }`}
          >
            <Icon
              aria-hidden
              className={`size-4 shrink-0 ${has ? "text-secondary" : ""}`}
            />
            {label}
            {!has && <span className="sr-only">(not in this room)</span>}
          </li>
        );
      })}
    </ul>
  );
}
