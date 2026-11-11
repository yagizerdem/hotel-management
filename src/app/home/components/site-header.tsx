"use client";

import Link from "next/link";
import { hotel, navLinks } from "@/src/app/home/data/hotel";
import { MobileNav } from "@/src/app/home/components/mobile-nav";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectAuthStatus,
  AuthStatus,
  clearUser,
} from "@store/slice/auth-slice";
import { Button } from "@base-ui/react";
import { useHydrated } from "@hooks/use-hydrated";
import { signOut } from "@actions/auth-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SiteHeader() {
  const user = useSelector(selectUser);
  const storeStatus: AuthStatus = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const router = useRouter();
  // The server always renders "unknown". The user can load into the store
  // before this header hydrates, so keep "unknown" until it has, or the
  // first client render won't match the server's HTML.
  const hydrated = useHydrated();
  const authStatus: AuthStatus = hydrated ? storeStatus : "unknown";
  const [_, setLoading] = useState(false);

  async function handleSignOut() {
    try {
      setLoading(true);
      // The action doesn't throw: failures come back with success: false.
      const response = await signOut();
      if (!response.success) {
        toast.error(response.error || "Sign out failed. Try again.", {
          position: "top-right",
          duration: 5000,
        });
        return;
      }

      dispatch(clearUser());
      // Re-render server components without the old session.
      router.refresh();
    } catch {
      // Only reached when the request itself fails, for example offline.
      toast.error("Couldn't reach the server. Check your connection.", {
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

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

        {authStatus === "authenticated" && user && (
          <div className="ml-auto hidden items-center gap-5 md:flex">
            <Button
              onMouseUp={() => handleSignOut()}
              className="cursor-pointer"
            >
              Sign out
            </Button>
            <span className="text-sm text-secondary">
              Welcome, {user.firstName} {user.lastName}
            </span>
          </div>
        )}

        {authStatus === "unauthenticated" && (
          <div className="ml-auto hidden items-center gap-5 md:flex">
            <a
              className="text-sm text-secondary hover:underline cursor-pointer"
              onMouseUp={() => router.push("/auth/sign-in")}
            >
              Sign in
            </a>
            <a
              href="#booking"
              className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
            >
              Book a room
            </a>
          </div>
        )}

        {/* While the session is still loading, hold the space so the menu
            doesn't jump, and show neither "Sign in" nor the user. */}
        {authStatus === "unknown" && (
          <div aria-hidden className="ml-auto hidden md:block" />
        )}

        <MobileNav />
      </div>
    </header>
  );
}
