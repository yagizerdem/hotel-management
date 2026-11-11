import Link from "next/link";
import { HealthLabel } from "@/src/app/it/components/status";
import type { Health } from "@/src/app/it/lib/types";

export type StatusItem = {
  label: string;
  health: Health;
  value: string;
  context: string;
  href: string;
};

/**
 * The four things the IT specialist checks first, side by side in one
 * hairline frame rather than as separate cards.
 */
export function StatusStrip({ items }: { items: StatusItem[] }) {
  return (
    <ul className="grid border border-border bg-popover sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <li
          key={item.label}
          className={`border-border ${index > 0 ? "border-t sm:border-t-0" : ""} ${
            index % 2 === 1 ? "sm:border-l" : ""
          } ${index >= 2 ? "sm:border-t xl:border-t-0" : ""} ${
            index > 0 ? "xl:border-l" : ""
          }`}
        >
          <Link
            href={item.href}
            className="flex h-full flex-col gap-2 p-5 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
          >
            <span className="flex items-center justify-between gap-2 text-sm text-foreground/70">
              {item.label}
              <HealthLabel health={item.health} iconOnly />
            </span>
            <span className="text-xl font-semibold tabular-nums">
              {item.value}
            </span>
            <span className="text-sm text-foreground/65">{item.context}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
