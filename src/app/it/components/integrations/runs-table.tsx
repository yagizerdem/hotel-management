import { formatDateTime } from "@/src/app/it/lib/format";
import type { IntegrationRun } from "@/src/app/it/lib/types";

function formatMs(ms: number) {
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;
}

export function RunsTable({ runs }: { runs: IntegrationRun[] }) {
  if (runs.length === 0) {
    return (
      <p className="px-5 py-4 text-sm text-foreground/70">
        This service hasn&apos;t run yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">Recent runs</caption>
        <thead className="text-foreground/65">
          <tr>
            <th scope="col" className="px-5 pt-3 pb-2 font-medium">
              Started
            </th>
            <th scope="col" className="px-3 pt-3 pb-2 font-medium">
              Result
            </th>
            <th scope="col" className="px-3 pt-3 pb-2 font-medium">
              Details
            </th>
            <th scope="col" className="px-5 pt-3 pb-2 text-right font-medium">
              Took
            </th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="align-top">
              <td className="px-5 py-2 tabular-nums">
                {formatDateTime(run.startedAt)}
              </td>
              <td className="px-3 py-2">
                {run.result === "success" ? (
                  <span className="text-secondary">Succeeded</span>
                ) : (
                  <span className="font-medium text-destructive">
                    Failed
                    {run.attempt > 1 && `, try ${run.attempt}`}
                  </span>
                )}
              </td>
              <td className="px-3 py-2 text-foreground/80">{run.summary}</td>
              <td className="px-5 py-2 text-right tabular-nums">
                {formatMs(run.durationMs)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
