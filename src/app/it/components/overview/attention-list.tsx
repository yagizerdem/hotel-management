import Link from "next/link";
import { CircleAlertIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Panel } from "@/src/app/it/components/panel";
import type { AttentionItem, Severity } from "@/src/app/it/lib/types";
import { textAction } from "@/src/app/it/lib/ui";

const SEVERITY: Record<
  Severity,
  { icon: typeof InfoIcon; label: string; className: string }
> = {
  error: {
    icon: CircleAlertIcon,
    label: "Failing",
    className: "text-destructive",
  },
  warning: {
    icon: TriangleAlertIcon,
    label: "Warning",
    className: "text-amber-700 dark:text-amber-400",
  },
  info: { icon: InfoIcon, label: "Note", className: "text-secondary" },
};

export function AttentionList({ items }: { items: AttentionItem[] }) {
  return (
    <Panel
      title="Needs attention"
      description={
        items.length
          ? `${items.length} ${items.length === 1 ? "issue" : "issues"} to look at`
          : undefined
      }
    >
      {items.length === 0 ? (
        <p className="px-5 py-8 text-sm text-foreground/70">
          Nothing needs attention. Backups, the database and the services are
          all working.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((item) => {
            const { icon: Icon, label, className } = SEVERITY[item.severity];
            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-3">
                  <Icon
                    aria-hidden
                    className={`mt-0.5 size-5 shrink-0 ${className}`}
                  />
                  <div>
                    <p className="font-medium">
                      <span className="sr-only">{label}: </span>
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-foreground/65">
                      {item.detail}
                    </p>
                  </div>
                </div>
                <Link
                  href={item.action.href}
                  className={`${textAction} shrink-0 pl-8 sm:pl-0`}
                >
                  {item.action.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
