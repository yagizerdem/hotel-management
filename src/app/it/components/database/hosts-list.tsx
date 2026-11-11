"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { HealthLabel } from "@/src/app/it/components/status";
import { formatTime } from "@/src/app/it/lib/format";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { DatabaseHost } from "@/src/app/it/lib/types";
import {
  primaryButton,
  secondaryButton,
  textAction,
} from "@/src/app/it/lib/ui";

function SwitchHostDialog({ host }: { host: DatabaseHost }) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={textAction}>
        Switch to this server
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md! gap-0 rounded-sm p-0 ring-border">
        <div className="border-b border-border p-5">
          <AlertDialogTitle className="text-lg font-semibold">
            Switch to {host.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-foreground/75">
            Every computer in the hotel will read and save data on {host.host}{" "}
            from now on. Make sure it holds an up-to-date copy: restore the
            latest backup onto it first.
          </AlertDialogDescription>
        </div>
        <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:justify-end">
          <AlertDialogPrimitive.Close className={secondaryButton}>
            Cancel
          </AlertDialogPrimitive.Close>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              notConnected("Switching the database server");
            }}
            className={primaryButton}
          >
            Switch server
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function HostsList({ hosts }: { hosts: DatabaseHost[] }) {
  return (
    <ul className="divide-y divide-border">
      {hosts.map((host) => (
        <li
          key={host.id}
          className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium">{host.name}</span>
              {host.active ? (
                <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">
                  In use
                </span>
              ) : (
                <span className="rounded-sm border border-border px-1.5 py-0.5 text-xs">
                  Standby
                </span>
              )}
            </p>
            <p className="mt-1 font-mono text-xs text-foreground/70">
              {host.host}:{host.port}/{host.database}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex flex-col items-start sm:items-end">
              <HealthLabel
                health={host.health}
                label={
                  host.health === "ok" && host.latencyMs !== undefined
                    ? `Reachable, ${host.latencyMs} ms`
                    : undefined
                }
              />
              <span className="text-xs text-foreground/60 tabular-nums">
                Checked at {formatTime(host.lastCheckedAt)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => notConnected("Testing the connection")}
              className={textAction}
            >
              Test
            </button>
            {!host.active && <SwitchHostDialog host={host} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
