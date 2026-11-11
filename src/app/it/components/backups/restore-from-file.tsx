"use client";

import { useId, useState } from "react";
import { UploadIcon } from "lucide-react";
import { RestoreDialog } from "@/src/app/it/components/backups/restore-dialog";
import { formatBytes } from "@/src/app/it/lib/format";

/** Restores from a backup file kept somewhere else, such as a USB drive. */
export function RestoreFromFile() {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-4 px-5 py-5">
      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-start gap-2 border border-dashed border-foreground/30 p-5 text-sm transition-colors hover:border-secondary focus-within:border-secondary"
      >
        <UploadIcon aria-hidden className="size-5 text-foreground/60" />
        <span className="font-medium">
          {file ? file.name : "Choose a backup file"}
        </span>
        <span className="text-foreground/65">
          {file
            ? formatBytes(file.size)
            : "An .archive or .gz file made by this panel."}
        </span>
        <input
          id={inputId}
          type="file"
          accept=".archive,.gz"
          className="sr-only"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </label>
      {file && (
        <div className="flex justify-end">
          <RestoreDialog label={file.name} trigger="Restore from this file" />
        </div>
      )}
    </div>
  );
}
