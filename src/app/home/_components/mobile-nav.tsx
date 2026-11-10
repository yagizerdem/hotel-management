"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { homeFontClassName } from "../_lib/fonts";
import { hotel, navLinks } from "../_data/hotel";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="ml-auto inline-flex size-10 items-center justify-center rounded-sm text-pine hover:bg-pine/5 md:hidden"
        aria-label="Menüyü aç"
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`${homeFontClassName} bg-limestone p-6 text-pine`}
      >
        <SheetTitle className="font-[family-name:var(--font-bodoni)] text-2xl">
          {hotel.name}
        </SheetTitle>
        <nav aria-label="Mobil menü">
          <ul className="flex flex-col gap-1 text-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} className="block py-2">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <a
            href="#uyelik"
            onClick={close}
            className="rounded-sm border border-pine/20 px-4 py-2.5 text-center"
          >
            Giriş yap
          </a>
          <a
            href="#rezervasyon"
            onClick={close}
            className="rounded-sm bg-bougainvillea px-4 py-2.5 text-center font-medium text-white"
          >
            Rezervasyon yap
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
