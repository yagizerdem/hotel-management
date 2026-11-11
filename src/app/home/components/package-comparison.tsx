import { CheckIcon } from "lucide-react";
import { packages } from "@/src/app/home/data/sd";

export function PackageComparison() {
  return (
    <section
      id="packages"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Choose the package that suits you
        </h2>
        <p className="mt-4 text-foreground/70">
          Book your stay on a full board or all-inclusive basis.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {packages.map((pkg) => {
          const featured = pkg.id === "all-inclusive";
          return (
            <article
              key={pkg.id}
              className={`flex flex-col rounded-sm border p-8 sm:p-10 ${
                featured
                  ? "border-primary/40 bg-muted"
                  : "border-border bg-background"
              }`}
            >
              <h3 className="font-[family-name:var(--font-bodoni)] text-4xl">
                {pkg.name}
              </h3>
              <p className="mt-4 border-t border-border pt-4 text-foreground/75">
                {pkg.summary}
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon
                      aria-hidden
                      className={`mt-0.5 size-5 shrink-0 ${
                        featured ? "text-primary" : "text-secondary"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-foreground/70">
                {pkg.earlyDiscount}% off when you book online at least a month
                ahead
              </p>
              <a
                href="#booking"
                className={`mt-6 inline-flex h-12 items-center justify-center rounded-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none ${
                  featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Search with {pkg.name.toLowerCase()}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
