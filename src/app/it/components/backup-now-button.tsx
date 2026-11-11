"use client";

import { ArchiveIcon } from "lucide-react";
import { notConnected } from "@/src/app/it/lib/not-connected";
import { primaryButton } from "@/src/app/it/lib/ui";

/** Starts a manual backup. A backup doesn't change any data, so no dialog. */
export function BackupNowButton() {
  return (
    <button
      type="button"
      onClick={() => notConnected("Backing up")}
      className={primaryButton}
    >
      <ArchiveIcon aria-hidden className="size-4" />
      Back up now
    </button>
  );
}
