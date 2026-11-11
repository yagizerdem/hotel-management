"use client";

import { Switch } from "@components/ui/switch";
import { formatDateTime } from "@/src/app/it/lib/format";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { StaffAccess } from "@/src/app/it/lib/types";

const ROLE_LABEL: Record<StaffAccess["role"], string> = {
  receptionist: "Reception",
  manager: "Manager",
  it_admin: "IT",
};

/**
 * Who may take backups and who may restore them. Restoring is kept to as
 * few people as possible, since it replaces the live data.
 */
export function AccessTable({ staff }: { staff: StaffAccess[] }) {
  // The switch keeps its saved value until the server confirms a change.
  const toggle = () => notConnected("Changing access");

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b border-border text-foreground/65">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">
              Person
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Role
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Last signed in
            </th>
            <th scope="col" className="px-3 py-3 text-center font-medium">
              Take backups
            </th>
            <th scope="col" className="px-5 py-3 text-center font-medium">
              Restore backups
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {staff.map((row) => {
            // The IT account always keeps both, so nobody is locked out.
            const locked = row.role === "it_admin";
            return (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <span className="block font-medium">{row.name}</span>
                  <span className="block text-xs text-foreground/60">
                    {row.email}
                  </span>
                </td>
                <td className="px-3 py-3">{ROLE_LABEL[row.role]}</td>
                <td className="px-3 py-3 tabular-nums">
                  {row.lastSignInAt
                    ? formatDateTime(row.lastSignInAt)
                    : "Never"}
                </td>
                {(["canBackup", "canRestore"] as const).map((permission, i) => (
                  <td
                    key={permission}
                    className={`py-3 text-center ${i === 1 ? "px-5" : "px-3"}`}
                  >
                    <Switch
                      checked={row[permission]}
                      disabled={locked}
                      onCheckedChange={toggle}
                      aria-label={`${row.name} can ${
                        permission === "canBackup" ? "take" : "restore"
                      } backups`}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
