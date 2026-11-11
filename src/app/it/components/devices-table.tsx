import { ServerIcon, MonitorIcon } from "lucide-react";
import { OnlineLabel } from "@/src/app/it/components/status";
import { formatDateTime } from "@/src/app/it/lib/format";
import type { Device } from "@/src/app/it/lib/types";

type DevicesTableProps = {
  devices: Device[];
  /** Hides the IP address and role columns, for the overview. */
  compact?: boolean;
};

export function DevicesTable({ devices, compact = false }: DevicesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b border-border text-foreground/65">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Location
            </th>
            {!compact && (
              <th scope="col" className="px-3 py-3 font-medium">
                IP address
              </th>
            )}
            <th scope="col" className="px-3 py-3 font-medium">
              Operating system
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Domain
            </th>
            <th scope="col" className="px-5 py-3 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {devices.map((device) => {
            const Icon = device.kind === "server" ? ServerIcon : MonitorIcon;
            return (
              <tr key={device.id} className="align-top">
                <td className="px-5 py-3">
                  <span className="flex items-start gap-2.5">
                    <Icon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-foreground/55"
                    />
                    <span>
                      <span className="block font-medium">{device.name}</span>
                      {!compact && (
                        <span className="block text-xs text-foreground/60">
                          {device.role}
                        </span>
                      )}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-3">{device.location}</td>
                {!compact && (
                  <td className="px-3 py-3 font-mono text-xs tabular-nums">
                    {device.ipAddress}
                  </td>
                )}
                <td className="px-3 py-3">{device.os}</td>
                <td className="px-3 py-3">
                  {device.onDomain ? "Joined" : "Not joined"}
                </td>
                <td className="px-5 py-3">
                  <OnlineLabel online={device.online} />
                  {!device.online && (
                    <span className="mt-0.5 block text-xs text-foreground/60 tabular-nums">
                      Last seen {formatDateTime(device.lastSeenAt)}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
