import Link from "next/link";
import { hotel, navLinks } from "@/src/app/home/data/hotel";
import { MobileNav } from "@/src/app/home/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-4 sm:px-6">
        <Link
          href="/home"
          className="font-[family-name:var(--font-bodoni)] text-2xl leading-none font-semibold"
        >
          {hotel.name}
        </Link>

        <nav aria-label="Main menu" className="hidden flex-1 md:block">
          <ul className="flex gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-foreground/75 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <a href="#membership" className="text-sm text-secondary hover:underline">
            Sign in
          </a>
          <a
            href="#booking"
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
          >
            Book a room
          </a>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
