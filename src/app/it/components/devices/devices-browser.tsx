"use client";

import { useMemo, useState } from "react";
import { DevicesTable } from "@/src/app/it/components/devices-table";
import { Panel } from "@/src/app/it/components/panel";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { Device } from "@/src/app/it/lib/types";
import { textAction } from "@/src/app/it/lib/ui";

type Filter = "all" | "offline" | "server" | "workstation";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "offline", label: "Offline" },
  { id: "server", label: "Servers" },
  { id: "workstation", label: "Workstations" },
];

function matches(device: Device, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "offline") return !device.online;
  return device.kind === filter;
}

export function DevicesBrowser({ devices }: { devices: Device[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = useMemo(
    () => devices.filter((device) => matches(device, filter)),
    [devices, filter],
  );

  return (
    <Panel
      title="All devices"
      description={`Showing ${shown.length} of ${devices.length}`}
      action={
        <button
          type="button"
          onClick={() => notConnected("Checking every device")}
          className={textAction}
        >
          Check all now
        </button>
      }
    >
      <div
        role="group"
        aria-label="Show"
        className="flex flex-wrap gap-2 border-b border-border px-5 py-3"
      >
        {FILTERS.map(({ id, label }) => {
          const count = devices.filter((device) => matches(device, id)).length;
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(id)}
              className={`h-8 rounded-sm border px-3 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              {label} <span className="tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      {shown.length ? (
        <DevicesTable devices={shown} />
      ) : (
        <p className="px-5 py-8 text-sm text-foreground/70">
          {filter === "offline"
            ? "Every device is online."
            : "No devices of this kind."}
        </p>
      )}
    </Panel>
  );
}
