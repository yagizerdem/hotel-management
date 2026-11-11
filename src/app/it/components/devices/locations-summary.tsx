import type { Device } from "@/src/app/it/lib/types";

/** How many devices each part of the hotel has, and how many are offline. */
export function LocationsSummary({ devices }: { devices: Device[] }) {
  const locations = new Map<string, { total: number; offline: number }>();
  for (const device of devices) {
    const entry = locations.get(device.location) ?? { total: 0, offline: 0 };
    entry.total += 1;
    if (!device.online) entry.offline += 1;
    locations.set(device.location, entry);
  }

  return (
    <ul className="grid border border-border bg-popover sm:grid-cols-3 lg:grid-cols-5">
      {[...locations.entries()].map(([location, { total, offline }]) => (
        <li
          key={location}
          className="-mt-px -ml-px border-t border-l border-border px-5 py-4"
        >
          <p className="text-sm text-foreground/70">{location}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{total}</p>
          <p
            className={`text-sm ${offline ? "font-medium text-destructive" : "text-foreground/60"}`}
          >
            {offline ? `${offline} offline` : "All online"}
          </p>
        </li>
      ))}
    </ul>
  );
}
