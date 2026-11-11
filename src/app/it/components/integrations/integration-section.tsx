"use client";

import { useState } from "react";
import { RunsTable } from "@/src/app/it/components/integrations/runs-table";
import { HealthLabel } from "@/src/app/it/components/status";
import { formatDateTime } from "@/src/app/it/lib/format";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { Integration, IntegrationRun } from "@/src/app/it/lib/types";
import { field, secondaryButton, textAction } from "@/src/app/it/lib/ui";

type IntegrationSectionProps = {
  integration: Integration;
  runs: IntegrationRun[];
};

// What the main button does for each service.
const RUN_LABEL: Record<Integration["id"], string> = {
  governorship: "Send report now",
  "exchange-rates": "Fetch rates now",
  "national-id": "Test a lookup",
};

export function IntegrationSection({
  integration,
  runs,
}: IntegrationSectionProps) {
  const [editing, setEditing] = useState(false);
  const [endpoint, setEndpoint] = useState(integration.endpoint);
  const failing = integration.health === "error";
  const headingId = `${integration.id}-title`;

  return (
    <section
      id={integration.id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 border bg-popover ${
        failing ? "border-destructive/60" : "border-border"
      }`}
    >
      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <h2 id={headingId} className="text-lg font-semibold">
              {integration.name}
            </h2>
            <HealthLabel health={integration.health} />
          </div>
          <p className="mt-1 text-sm text-foreground/70">
            {integration.purpose}
          </p>
          <p className="mt-3 text-sm">{integration.lastResult}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => notConnected("Checking the service")}
            className={textAction}
          >
            Check connection
          </button>
          <button
            type="button"
            onClick={() => notConnected(RUN_LABEL[integration.id])}
            className={secondaryButton}
          >
            {failing ? "Retry now" : RUN_LABEL[integration.id]}
          </button>
        </div>
      </div>

      <dl className="grid gap-x-6 gap-y-4 border-b border-border px-5 py-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div className="sm:col-span-2">
          <dt className="text-foreground/65">Service address</dt>
          <dd className="mt-1">
            {editing ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setEditing(false);
                  notConnected("Changing the service address");
                }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <label
                  className="sr-only"
                  htmlFor={`${integration.id}-endpoint`}
                >
                  Service address
                </label>
                <input
                  id={`${integration.id}-endpoint`}
                  value={endpoint}
                  onChange={(event) => setEndpoint(event.target.value)}
                  className={`${field} font-mono text-xs`}
                  spellCheck={false}
                />
                <span className="flex gap-4">
                  <button type="submit" className={textAction}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEndpoint(integration.endpoint);
                      setEditing(false);
                    }}
                    className={`${textAction} text-foreground/70`}
                  >
                    Cancel
                  </button>
                </span>
              </form>
            ) : (
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-xs break-all">{endpoint}</span>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className={textAction}
                >
                  Change
                </button>
              </span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-foreground/65">Protocol</dt>
          <dd className="mt-1">{integration.protocol}</dd>
        </div>
        <div>
          <dt className="text-foreground/65">Runs</dt>
          <dd className="mt-1">{integration.schedule}</dd>
        </div>
        <div>
          <dt className="text-foreground/65">Last run</dt>
          <dd className="mt-1 tabular-nums">
            {integration.lastRunAt
              ? formatDateTime(integration.lastRunAt)
              : "Never"}
          </dd>
        </div>
        <div>
          <dt className="text-foreground/65">Next run</dt>
          <dd className="mt-1 tabular-nums">
            {integration.nextRunAt
              ? formatDateTime(integration.nextRunAt)
              : "When reception asks"}
          </dd>
        </div>
      </dl>

      <RunsTable runs={runs} />
      <div className="h-3" />
    </section>
  );
}
