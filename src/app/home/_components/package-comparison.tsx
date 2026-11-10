import { CheckIcon } from "lucide-react";
import { packages } from "../_data/hotel";

export function PackageComparison() {
  return (
    <section
      id="paketler"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Size uygun paketi seçin
        </h2>
        <p className="mt-4 text-pine/70">
          Konaklamanızı tam pansiyon ya da her şey dahil olarak ayırabilirsiniz.
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
                  ? "border-bougainvillea/40 bg-sand"
                  : "border-pine/10 bg-limestone"
              }`}
            >
              <h3 className="font-[family-name:var(--font-bodoni)] text-4xl">
                {pkg.name}
              </h3>
              <p className="mt-4 border-t border-pine/10 pt-4 text-pine/75">
                {pkg.summary}
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon
                      aria-hidden
                      className={`mt-0.5 size-5 shrink-0 ${
                        featured ? "text-bougainvillea" : "text-aegean"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-pine/70">
                En az 1 ay önce internetten ayırana %{pkg.earlyDiscount} indirim
              </p>
              <a
                href="#rezervasyon"
                className={`mt-6 inline-flex h-12 items-center justify-center rounded-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-bougainvillea/40 focus-visible:outline-none ${
                  featured
                    ? "bg-bougainvillea text-white hover:bg-bougainvillea/90"
                    : "border border-pine text-pine hover:bg-pine hover:text-limestone"
                }`}
              >
                {pkg.name} ile ara
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
