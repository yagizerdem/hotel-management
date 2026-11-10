import { hotel, navLinks } from "../_data/hotel";

export function SiteFooter() {
  return (
    <footer className="border-t border-limestone/10 bg-pine text-limestone">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[2fr_1.5fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-bodoni)] text-4xl">
            {hotel.name}
          </p>
          <p className="mt-4 max-w-sm text-limestone/70">
            Kemer&apos;de, çam ormanlarıyla denizin buluştuğu 5 yıldızlı otel.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h2 className="mb-2 font-medium">İletişim</h2>
          <p className="text-limestone/70">{hotel.location}, Türkiye</p>
          <a
            href={`tel:${hotel.phone.replace(/\s/g, "")}`}
            className="text-limestone/90 hover:underline"
          >
            {hotel.phone}
          </a>
          <a
            href={`mailto:${hotel.email}`}
            className="text-limestone/90 hover:underline"
          >
            {hotel.email}
          </a>
        </div>

        <nav aria-label="Alt menü" className="text-sm">
          <h2 className="mb-4 font-medium">Keşfedin</h2>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-limestone/70 hover:text-limestone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl border-t border-limestone/10 px-4 py-6 text-sm text-limestone/55 sm:px-6">
        © {hotel.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
