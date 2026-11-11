"use client";

import { useState } from "react";
import { LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { ItNavLinks } from "@/src/app/it/components/it-nav-links";
import { notConnected } from "@/src/app/it/lib/not-connected";

type User = { name: string; title: string };

// The sidebar stays deep pine in both themes: it is the panel's fixed frame.
const frame = "bg-[#17352e] text-[#eef1ec]";

function Brand() {
  return (
    <div className="px-3">
      <p className="font-[family-name:var(--font-bodoni)] text-2xl leading-tight">
        Bilge Hotel
      </p>
      <p className="text-sm text-[#eef1ec]/65">IT panel</p>
    </div>
  );
}

function SignedInUser({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 pt-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="text-xs text-[#eef1ec]/65">{user.title}</p>
      </div>
      <button
        type="button"
        onClick={() => notConnected("Signing out")}
        aria-label="Sign out"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm text-[#eef1ec]/75 hover:bg-white/10 hover:text-[#eef1ec] focus-visible:ring-3 focus-visible:ring-[#89d0f1]/50 focus-visible:outline-none"
      >
        <LogOutIcon aria-hidden className="size-4" />
      </button>
    </div>
  );
}

/** Fixed sidebar on wide screens. */
export function ItSidebar({ user }: { user: User }) {
  return (
    <aside
      className={`${frame} sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-8 px-3 py-6 lg:flex`}
    >
      <Brand />
      <nav aria-label="IT panel" className="flex-1">
        <ItNavLinks />
      </nav>
      <SignedInUser user={user} />
    </aside>
  );
}

/** Top bar with a menu button on narrow screens. */
export function ItMobileBar({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${frame} sticky top-0 z-40 flex h-14 items-center justify-between px-4 lg:hidden`}
    >
      <p className="font-[family-name:var(--font-bodoni)] text-xl">
        Bilge Hotel <span className="text-sm text-[#eef1ec]/65">IT panel</span>
      </p>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-sm hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-[#89d0f1]/50 focus-visible:outline-none"
        >
          <MenuIcon aria-hidden className="size-5" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className={`${homeFontClassName} ${frame} flex flex-col gap-8 border-none px-3 py-6 shadow-none`}
        >
          <SheetTitle className="sr-only">IT panel menu</SheetTitle>
          <Brand />
          <nav aria-label="IT panel" className="flex-1">
            <ItNavLinks onNavigate={() => setOpen(false)} />
          </nav>
          <SignedInUser user={user} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
