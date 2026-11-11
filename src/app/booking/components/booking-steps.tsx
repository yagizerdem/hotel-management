import { CheckIcon } from "lucide-react";
import type { BookingStep } from "@/src/app/booking/lib/types";

export const STEPS: { id: BookingStep; label: string }[] = [
  { id: "stay", label: "Your stay" },
  { id: "room", label: "Room" },
  { id: "guests", label: "Guests" },
  { id: "review", label: "Review and pay" },
];

type BookingStepsProps = {
  current: BookingStep;
  /** Steps already completed can be reopened. */
  onSelect: (step: BookingStep) => void;
};

export function BookingSteps({ current, onSelect }: BookingStepsProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <nav aria-label="Booking steps">
      <ol className="grid grid-cols-4 border-b border-border">
        {STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const content = (
            <>
              <span
                aria-hidden
                className={`flex size-6 shrink-0 items-center justify-center rounded-sm text-xs font-semibold tabular-nums ${
                  active
                    ? "bg-foreground text-background"
                    : done
                      ? "bg-secondary text-secondary-foreground"
                      : "border border-foreground/30 text-foreground/60"
                }`}
              >
                {done ? <CheckIcon className="size-3.5" /> : index + 1}
              </span>
              <span
                className={`hidden sm:inline ${active ? "font-medium" : ""}`}
              >
                {step.label}
              </span>
              <span className="sr-only sm:hidden">{step.label}</span>
            </>
          );
          return (
            <li
              key={step.id}
              className={`-mb-px border-b-2 ${
                active ? "border-foreground" : "border-transparent"
              }`}
            >
              {done ? (
                <button
                  type="button"
                  onClick={() => onSelect(step.id)}
                  className="flex w-full items-center gap-2.5 py-3 text-left text-sm text-foreground/80 hover:text-foreground focus-visible:underline focus-visible:outline-none"
                >
                  {content}
                  <span className="sr-only">, done. Change</span>
                </button>
              ) : (
                <span
                  aria-current={active ? "step" : undefined}
                  className={`flex items-center gap-2.5 py-3 text-sm ${
                    active ? "" : "text-foreground/55"
                  }`}
                >
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
