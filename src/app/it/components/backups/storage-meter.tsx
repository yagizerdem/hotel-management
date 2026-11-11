import { formatBytes } from "@/src/app/it/lib/format";
import type { StorageUsage } from "@/src/app/it/lib/types";

/** How full the backup disk is, with a warning past 80%. */
export function StorageMeter({
  usage,
  averageBackupBytes,
}: {
  usage: StorageUsage;
  averageBackupBytes: number;
}) {
  const ratio = usage.usedBytes / usage.totalBytes;
  const percent = Math.round(ratio * 100);
  const warn = ratio >= 0.8;
  const fits = Math.floor(
    (usage.totalBytes - usage.usedBytes) / averageBackupBytes,
  );

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span>
          <span className="font-semibold tabular-nums">
            {formatBytes(usage.usedBytes)}
          </span>{" "}
          of {formatBytes(usage.totalBytes)} used
        </span>
        <span
          className={`tabular-nums ${warn ? "font-medium text-amber-700 dark:text-amber-400" : "text-foreground/65"}`}
        >
          {percent}%
        </span>
      </div>
      <div
        role="meter"
        aria-label="Backup storage used"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 w-full bg-muted"
      >
        <div
          className={`h-full ${warn ? "bg-amber-600" : "bg-secondary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm text-foreground/65">
        About {fits} more {fits === 1 ? "backup fits" : "backups fit"} at the
        current size.{" "}
        {warn && "Delete old backups or keep fewer of them to free space."}
      </p>
    </div>
  );
}
