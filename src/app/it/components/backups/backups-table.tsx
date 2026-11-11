"use client";

import { CircleCheckIcon, CircleDashedIcon } from "lucide-react";
import { RestoreDialog } from "@/src/app/it/components/backups/restore-dialog";
import {
  formatBytes,
  formatDateTime,
  formatDuration,
} from "@/src/app/it/lib/format";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { Backup, BackupKind } from "@/src/app/it/lib/types";
import { textAction } from "@/src/app/it/lib/ui";

const KIND_LABEL: Record<BackupKind, string> = {
  scheduled: "Scheduled",
  manual: "Manual",
  "before-restore": "Before a restore",
};

export function BackupsTable({ backups }: { backups: Backup[] }) {
  if (backups.length === 0) {
    return (
      <p className="px-5 py-8 text-sm text-foreground/70">
        No backups yet. Use Back up now to take the first one, or turn on the
        schedule below.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="border-b border-border text-foreground/65">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">
              Taken
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Type
            </th>
            <th scope="col" className="px-3 py-3 text-right font-medium">
              Size
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Check
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {backups.map((backup) => (
            <tr key={backup.id} className="align-top">
              <td className="px-5 py-3">
                <span className="block font-medium tabular-nums">
                  {formatDateTime(backup.createdAt)}
                </span>
                <span className="block text-xs text-foreground/60">
                  {backup.createdBy}, took{" "}
                  {formatDuration(backup.durationSeconds)}
                </span>
              </td>
              <td className="px-3 py-3">{KIND_LABEL[backup.kind]}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {formatBytes(backup.sizeBytes)}
              </td>
              <td className="px-3 py-3">
                {backup.verified ? (
                  <span className="inline-flex items-center gap-1.5 text-secondary">
                    <CircleCheckIcon aria-hidden className="size-4" />
                    Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => notConnected("Verifying a backup")}
                    className={`${textAction} text-foreground/70`}
                  >
                    <CircleDashedIcon aria-hidden className="size-4" />
                    Not verified, check now
                  </button>
                )}
              </td>
              <td className="px-5 py-3">
                <div className="flex justify-end gap-4">
                  <RestoreDialog
                    label={`the backup of ${formatDateTime(backup.createdAt)}`}
                    createdAt={backup.createdAt}
                  />
                  <button
                    type="button"
                    onClick={() => notConnected("Downloading a backup")}
                    className={textAction}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => notConnected("Deleting a backup")}
                    className={`${textAction} text-destructive`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
