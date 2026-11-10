import { InfoIcon } from "lucide-react";
import { earlyBookingDiscount, packages } from "../_data/hotel";

const fullBoard = packages.find((p) => p.id === "full-board")!;
const allInclusive = packages.find((p) => p.id === "all-inclusive")!;

const steps = [
  {
    when: "En az 3 ay önce",
    badge: `%${earlyBookingDiscount.threeMonths} indirim`,
    text: `Tüm paketlerde %${earlyBookingDiscount.threeMonths} indirim.`,
    tone: "accent",
  },
  {
    when: "En az 1 ay önce",
    badge: `%${allInclusive.earlyDiscount}'e varan`,
    text: `${allInclusive.name} paketinde %${allInclusive.earlyDiscount}, ${fullBoard.name.toLowerCase()} paketinde %${fullBoard.earlyDiscount} indirim.`,
    tone: "sand",
  },
  {
    when: "Son dakika",
    badge: "Standart fiyat",
    text: "Son bir ay içinde yapılan rezervasyonlarda standart gecelik fiyat geçerlidir.",
    tone: "muted",
  },
] as const;

const dotClassName = {
  accent: "bg-bougainvillea",
  sand: "bg-aegean",
  muted: "bg-pine/25",
};

const badgeClassName = {
  accent: "bg-bougainvillea text-white",
  sand: "bg-sand text-pine",
  muted: "text-pine/60",
};

export function EarlyBookingTimeline() {
  return (
    <section
      id="erken-rezervasyon"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6"
    >
      <div className="grid gap-6 border-b border-pine/10 pb-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Erken rezervasyon indirimleri
        </h2>
        <p className="text-pine/70">
          Tarihinizi ne kadar erken belirlerseniz, gecelik fiyat o kadar düşer.
        </p>
      </div>

      <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
        <span
          aria-hidden
          className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-pine/15 md:block"
        />
        {steps.map((step) => (
          <li
            key={step.when}
            className="relative flex flex-col gap-3 rounded-sm border border-pine/10 bg-limestone p-6"
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
            <p className="text-pine/75">{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-pine/70">
        <InfoIcon className="size-4 shrink-0 text-aegean" aria-hidden />
        İndirimler yalnızca site üzerinden yapılan rezervasyonlarda geçerlidir.
      </p>
    </section>
  );
}
