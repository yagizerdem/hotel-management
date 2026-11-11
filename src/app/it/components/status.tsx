import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type { Health } from "@/src/app/it/lib/types";

// Status is never shown by color alone: each state has its own icon and word.
const HEALTH = {
  ok: { label: "Healthy", icon: CircleCheckIcon, className: "text-secondary" },
  warning: {
    label: "Needs a look",
    icon: TriangleAlertIcon,
    className: "text-amber-700 dark:text-amber-400",
  },
  error: {
    label: "Failing",
    icon: CircleAlertIcon,
    className: "text-destructive",
  },
  unknown: {
    label: "Not checked",
    icon: CircleHelpIcon,
    className: "text-foreground/55",
  },
} satisfies Record<Health, unknown>;

export function HealthLabel({
  health,
  label,
  iconOnly = false,
}: {
  health: Health;
  label?: string;
  /** Shows only the icon; the word stays for screen readers. */
  iconOnly?: boolean;
}) {
  const { icon: Icon, className, label: fallback } = HEALTH[health];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-medium ${className}`}
    >
      <Icon aria-hidden className="size-4 shrink-0" />
      <span className={iconOnly ? "sr-only" : undefined}>
        {label ?? fallback}
      </span>
    </span>
  );
}

export function OnlineLabel({ online }: { online: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        aria-hidden
        className={`size-2 shrink-0 rounded-full ${
          online ? "bg-secondary" : "bg-destructive"
        }`}
      />
      {online ? "Online" : "Offline"}
    </span>
  );
}
