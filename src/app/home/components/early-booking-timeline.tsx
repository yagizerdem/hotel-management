import { InfoIcon } from "lucide-react";
import { earlyBookingDiscount, packages } from "@/src/app/home/data/sd";

const fullBoard = packages.find((p) => p.id === "full-board")!;
const allInclusive = packages.find((p) => p.id === "all-inclusive")!;

const steps = [
  {
    when: "3+ months ahead",
    badge: `${earlyBookingDiscount.threeMonths}% off`,
    text: `${earlyBookingDiscount.threeMonths}% off every package.`,
    tone: "accent",
  },
  {
    when: "1+ month ahead",
    badge: `Up to ${allInclusive.earlyDiscount}% off`,
    text: `${allInclusive.earlyDiscount}% off ${allInclusive.name.toLowerCase()}, ${fullBoard.earlyDiscount}% off ${fullBoard.name.toLowerCase()}.`,
    tone: "secondary",
  },
  {
    when: "Last minute",
    badge: "Standard rate",
    text: "Bookings made within a month of arrival pay the standard nightly rate.",
    tone: "muted",
  },
] as const;

const dotClassName = {
  accent: "bg-primary",
  secondary: "bg-secondary",
  muted: "bg-foreground/25",
};

const badgeClassName = {
  accent: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-foreground",
  muted: "text-foreground/60",
};

export function EarlyBookingTimeline() {
  return (
    <section
      id="early-booking"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6"
    >
      <div className="grid gap-6 border-b border-border pb-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Early booking discounts
        </h2>
        <p className="text-foreground/70">
          The earlier you pick your dates, the lower your nightly rate.
        </p>
      </div>

      <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
        <span
          aria-hidden
          className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-foreground/15 md:block"
        />
        {steps.map((step) => (
          <li
            key={step.when}
            className="relative flex flex-col gap-3 rounded-sm border border-border bg-background p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                aria-hidden
                className={`size-2.5 rounded-full ${dotClassName[step.tone]}`}
              />
              <span
                className={`rounded-sm px-2 py-0.5 text-xs font-medium ${badgeClassName[step.tone]}`}
              >
                {step.badge}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-bodoni)] text-2xl">
              {step.when}
            </h3>
            <p className="text-foreground/75">{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-foreground/70">
        <InfoIcon className="size-4 shrink-0 text-secondary" aria-hidden />
        Discounts apply only to bookings made on this website.
      </p>
    </section>
  );
}
