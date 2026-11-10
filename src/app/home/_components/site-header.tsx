import Link from "next/link";
import { hotel, navLinks } from "../_data/hotel";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-pine/10 bg-limestone/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-4 sm:px-6">
        <Link
          href="/home"
          className="font-[family-name:var(--font-bodoni)] text-2xl leading-none font-semibold"
        >
          {hotel.name}
        </Link>

        <nav aria-label="Ana menü" className="hidden flex-1 md:block">
          <ul className="flex gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-pine/75 transition-colors hover:text-pine"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <a href="#uyelik" className="text-sm text-aegean hover:underline">
            Giriş yap
          </a>
          <a
            href="#rezervasyon"
            className="rounded-sm bg-bougainvillea px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bougainvillea/90 focus-visible:ring-3 focus-visible:ring-bougainvillea/40 focus-visible:outline-none"
          >
            Rezervasyon yap
          </a>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
