"use client";

import { useMemo, useState } from "react";
import { ActivityList } from "@/src/app/it/components/activity-list";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { ActivityEntry } from "@/src/app/it/lib/types";
import { field, textAction } from "@/src/app/it/lib/ui";

/** Everything done in the panel or by its schedules, searchable. */
export function AuditLog({ entries }: { entries: ActivityEntry[] }) {
  const [query, setQuery] = useState("");
  const [failuresOnly, setFailuresOnly] = useState(false);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(
      (entry) =>
        (!failuresOnly || entry.result === "failure") &&
        (!q ||
          [entry.action, entry.actor, entry.target ?? ""].some((text) =>
            text.toLowerCase().includes(q),
          )),
    );
  }, [entries, query, failuresOnly]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-border px-5 py-3 sm:flex-row sm:items-center">
        <label className="flex-1">
          <span className="sr-only">Search the log</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by action or person"
            className={field}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={failuresOnly}
            onChange={(event) => setFailuresOnly(event.target.checked)}
            className="size-4 accent-[var(--secondary)]"
          />
          Failures only
        </label>
        <button
          type="button"
          onClick={() => notConnected("Exporting the log")}
          className={textAction}
        >
          Export as CSV
        </button>
      </div>
      {shown.length ? (
        <ActivityList entries={shown} />
      ) : (
        <p className="px-5 py-8 text-sm text-foreground/70">
          Nothing in the log matches. Try another word or clear the search.
        </p>
      )}
    </div>
  );
}
