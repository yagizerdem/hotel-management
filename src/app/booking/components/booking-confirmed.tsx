import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { hotel } from "@/src/app/home/data/sd";
import type { PaymentMethod } from "@/src/app/booking/lib/types";
import { secondaryButton } from "@/src/app/booking/lib/ui";

type BookingConfirmedProps = {
  reference: string;
  email: string;
  method: PaymentMethod;
};

export function BookingConfirmed({
  reference,
  email,
  method,
}: BookingConfirmedProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-start gap-5 border border-border bg-popover p-6 sm:p-8"
    >
      <CircleCheckIcon aria-hidden className="size-8 text-secondary" />
      <div>
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl">
          {method === "card"
            ? "Your booking is confirmed"
            : "Your room is held"}
        </h2>
        <p className="mt-3 max-w-lg text-foreground/75">
          {method === "card"
            ? `We've sent the confirmation to ${email}.`
            : `We've sent the bank details to ${email}. The room is held for 48 hours until the transfer arrives.`}{" "}
          Show the reference at reception when you arrive.
        </p>
      </div>
      <p className="border border-dashed border-foreground/30 px-4 py-3">
        <span className="block text-sm text-foreground/65">
          Booking reference
        </span>
        <span className="font-mono text-2xl tracking-wider">{reference}</span>
      </p>
      <p className="text-sm text-foreground/70">
        Questions? Call {hotel.phone} or write to {hotel.email}.
      </p>
      <Link href="/home" className={secondaryButton}>
        Back to the home page
      </Link>
    </div>
  );
}
