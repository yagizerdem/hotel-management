import { hotel } from "@/src/app/home/data/sd";

export const navLinks = [
  { href: "#rooms", label: "Rooms" },
  { href: "#packages", label: "Packages" },
  { href: "#amenities", label: "Amenities" },
  { href: "#early-booking", label: "Early booking" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-background/10 bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[2fr_1.5fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-bodoni)] text-4xl">
            {hotel.name}
          </p>
          <p className="mt-4 max-w-sm text-background/70">
            A 5-star hotel in Kemer, where pine forests meet the sea.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h2 className="mb-2 font-medium">Contact</h2>
          <p className="text-background/70">{hotel.location}, Türkiye</p>
          <a
            href={`tel:${hotel.phone.replace(/\s/g, "")}`}
            className="text-background/90 hover:underline"
          >
            {hotel.phone}
          </a>
          <a
            href={`mailto:${hotel.email}`}
            className="text-background/90 hover:underline"
          >
            {hotel.email}
          </a>
        </div>

        <nav aria-label="Footer menu" className="text-sm">
          <h2 className="mb-4 font-medium">Explore</h2>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-background/70 hover:text-background"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl border-t border-background/10 px-4 py-6 text-sm text-background/55 sm:px-6">
        © {hotel.name}. All rights reserved.
      </div>
    </footer>
  );
}
