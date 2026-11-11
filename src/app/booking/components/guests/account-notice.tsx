"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { UserRoundCheckIcon, UserRoundIcon } from "lucide-react";
import { selectAuthStatus, selectUser } from "@store/slice/auth-slice";
import { textAction } from "@/src/app/booking/lib/ui";

/**
 * Online bookings need an account, so the hotel can reach the guest and
 * fake bookings are kept out. Signed-in guests see whose account it is.
 */
export function AccountNotice() {
  const user = useSelector(selectUser);
  const status = useSelector(selectAuthStatus);

  if (status === "authenticated" && user) {
    return (
      <p className="flex items-center gap-3 border border-border bg-popover px-4 py-3 text-sm">
        <UserRoundCheckIcon
          aria-hidden
          className="size-5 shrink-0 text-secondary"
        />
        <span>
          Booking as{" "}
          <span className="font-medium">
            {user.firstName} {user.lastName}
          </span>{" "}
          ({user.email}). The confirmation goes to this address.
        </span>
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 border border-secondary/50 bg-secondary/5 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-3">
        <UserRoundIcon
          aria-hidden
          className="mt-0.5 size-5 shrink-0 text-secondary"
        />
        <span>
          <span className="block font-medium">Sign in to book</span>
          <span className="text-foreground/75">
            An account keeps your bookings in one place and tells you about our
            seasonal offers. Your details here are kept.
          </span>
        </span>
      </p>
      <span className="flex shrink-0 gap-5 pl-8 sm:pl-0">
        <Link href="/auth/sign-in?next=/booking" className={textAction}>
          Sign in
        </Link>
        <Link href="/auth/sign-up?next=/booking" className={textAction}>
          Create an account
        </Link>
      </span>
    </div>
  );
}
