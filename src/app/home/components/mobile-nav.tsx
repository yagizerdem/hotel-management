"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { hotel } from "@/src/app/home/data/sd";
import { Button } from "@components/ui/button";

export const navLinks = [
  { href: "#rooms", label: "Rooms" },
  { href: "#packages", label: "Packages" },
  { href: "#amenities", label: "Amenities" },
  { href: "#early-booking", label: "Early booking" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="ml-auto inline-flex size-10 items-center justify-center rounded-sm text-foreground hover:bg-foreground/5 md:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`${homeFontClassName} bg-background p-6 text-foreground`}
      >
        <SheetTitle className="font-[family-name:var(--font-bodoni)] text-2xl">
          {hotel.name}
        </SheetTitle>
        <nav aria-label="Mobile menu">
          <ul className="flex flex-col gap-1 text-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} className="block py-2">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button onMouseUp={() => router.push("/rooms")}>
                visit rooms
              </Button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <a
            href="#membership"
            onClick={close}
            className="rounded-sm border border-border px-4 py-2.5 text-center"
          >
            Sign in
          </a>
          <a
            href="#booking"
            onClick={close}
            className="rounded-sm bg-primary px-4 py-2.5 text-center font-medium text-primary-foreground"
          >
            Book a room
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
