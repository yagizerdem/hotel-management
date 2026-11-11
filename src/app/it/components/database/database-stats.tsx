import { formatBytes, formatCount } from "@/src/app/it/lib/format";
import type { DatabaseStats as DatabaseStatsModel } from "@/src/app/it/lib/types";

export function DatabaseStats({ stats }: { stats: DatabaseStatsModel }) {
  return (
    <div>
      <dl className="grid grid-cols-2 border-b border-border">
        <div className="px-5 py-4">
          <dt className="text-sm text-foreground/65">Size on disk</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">
            {formatBytes(stats.sizeBytes)}
          </dd>
        </div>
        <div className="border-l border-border px-5 py-4">
          <dt className="text-sm text-foreground/65">Version</dt>
          <dd className="mt-1 text-lg font-semibold">{stats.version}</dd>
        </div>
      </dl>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Records in each collection</caption>
        <thead className="text-foreground/65">
          <tr>
            <th scope="col" className="px-5 pt-3 pb-2 font-medium">
              Collection
            </th>
            <th scope="col" className="px-5 pt-3 pb-2 text-right font-medium">
              Records
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.collections.map((collection) => (
            <tr key={collection.name}>
              <td className="px-5 py-1.5">
                {collection.label}
                <span className="ml-2 font-mono text-xs text-foreground/50">
                  {collection.name}
                </span>
              </td>
              <td className="px-5 py-1.5 text-right tabular-nums">
                {formatCount(collection.documents)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-3" />
    </div>
  );
}
