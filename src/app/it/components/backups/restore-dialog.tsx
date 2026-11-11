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
import { formatDateTime } from "@/src/app/it/lib/format";
import { notConnected } from "@/src/app/it/lib/not-connected";
import {
  dangerButton,
  field,
  secondaryButton,
  textAction,
} from "@/src/app/it/lib/ui";

type RestoreDialogProps = {
  /** What is being restored, e.g. "the backup of 11 Nov, 03:00". */
  label: string;
  createdAt?: Date;
  trigger?: React.ReactNode;
};

const CONFIRM_WORD = "restore";

/**
 * Restoring replaces every record in the live database, so the dialog says
 * exactly what happens and asks for the word "restore" before it can go on.
 */
export function RestoreDialog({
  label,
  createdAt,
  trigger,
}: RestoreDialogProps) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const confirmed = typed.trim().toLowerCase() === CONFIRM_WORD;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setTyped("");
      }}
    >
      <AlertDialogTrigger className={textAction}>
        {trigger ?? "Restore"}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md! gap-0 rounded-sm p-0 ring-border">
        <div className="border-b border-border p-5">
          <AlertDialogTitle className="text-lg font-semibold">
            Restore {label}?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-foreground/75">
            Every reservation, guest and payment will go back to how it was
            {createdAt ? ` on ${formatDateTime(createdAt)}` : " in this backup"}
            . Anything entered since then is replaced.
          </AlertDialogDescription>
        </div>

        <div className="flex flex-col gap-4 p-5 text-sm">
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-foreground/80">
            <li>
              A backup of the current data is taken first, so you can undo this.
            </li>
            <li>
              Reception, the bar and the website can&apos;t save changes for
              about 2 minutes.
            </li>
          </ul>
          <label className="flex flex-col gap-1.5">
            <span className="font-medium">
              Type &ldquo;{CONFIRM_WORD}&rdquo; to confirm
            </span>
            <input
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              autoComplete="off"
              className={field}
            />
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border p-5 sm:flex-row sm:justify-end">
          <AlertDialogPrimitive.Close className={secondaryButton}>
            Cancel
          </AlertDialogPrimitive.Close>
          <button
            type="button"
            disabled={!confirmed}
            onClick={() => {
              setOpen(false);
              setTyped("");
              notConnected("Restoring");
            }}
            className={dangerButton}
          >
            Restore backup
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
