import { formatDateTime } from "@/src/app/it/lib/format";
import type { ActivityEntry } from "@/src/app/it/lib/types";

/** A timeline of what happened, newest first. */
export function ActivityList({ entries }: { entries: ActivityEntry[] }) {
  return (
    <ol className="relative flex flex-col px-5 py-4">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative flex gap-4 pb-5 last:pb-0">
          {index < entries.length - 1 && (
            <span
              aria-hidden
              className="absolute top-3 left-[3.5px] h-full w-px bg-border"
            />
          )}
          <span
            aria-hidden
            className={`relative mt-1.5 size-2 shrink-0 rounded-full ${
              entry.result === "success" ? "bg-secondary" : "bg-destructive"
            }`}
          />
          <div className="min-w-0">
            <p className="text-sm">
              <span className="font-medium">{entry.action}</span>
              {entry.target && (
                <span className="text-foreground/70"> {entry.target}</span>
              )}
              {entry.result === "failure" && (
                <span className="text-destructive"> (failed)</span>
              )}
            </p>
            <p className="mt-0.5 text-xs text-foreground/60 tabular-nums">
              <time dateTime={entry.at.toISOString()}>
                {formatDateTime(entry.at)}
              </time>
              , {entry.actor}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
