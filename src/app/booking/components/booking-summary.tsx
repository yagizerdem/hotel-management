import { packages } from "@/src/app/home/data/sd";
import { hotel } from "@/src/app/home/data/sd";
import type { AvailableRoom } from "@domain/home/room";
import {
  formatMoney,
  formatStayDate,
  nextDiscountTier,
  nightsOf,
  quoteFor,
  stayError,
} from "@/src/app/booking/lib/pricing";
import type { StayDetails } from "@/src/app/booking/lib/types";

type BookingSummaryProps = {
  stay: StayDetails;
  room: AvailableRoom | null;
};

/** What the guest is booking so far, and what it costs. */
export function BookingSummary({ stay, room }: BookingSummaryProps) {
  const validStay = !stayError(stay);
  const nights = validStay ? nightsOf(stay) : 0;
  const quote = room ? quoteFor(room, stay) : null;
  const pkg = packages.find((p) => p.id === stay.packageId);
  const nextTier = validStay ? nextDiscountTier(stay, stay.packageId) : null;

  return (
    <aside
      aria-label="Your booking"
      className="border border-border bg-popover lg:sticky lg:top-24"
    >
      <h2 className="border-b border-border px-5 py-4 font-[family-name:var(--font-bodoni)] text-2xl">
        Your booking
      </h2>

      <dl className="flex flex-col gap-3 px-5 py-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/65">Check-in</dt>
          <dd className="text-right">
            {stay.checkIn ? (
              <>
                {formatStayDate(stay.checkIn)}
                <span className="block text-xs text-foreground/60">
                  from {hotel.checkIn}
                </span>
              </>
            ) : (
              "Not chosen"
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/65">Check-out</dt>
          <dd className="text-right">
            {stay.checkOut ? (
              <>
                {formatStayDate(stay.checkOut)}
                <span className="block text-xs text-foreground/60">
                  by {hotel.checkOut}
                </span>
              </>
            ) : (
              "Not chosen"
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/65">Guests</dt>
          <dd>{stay.guests}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/65">Package</dt>
          <dd>{pkg?.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/65">Room</dt>
          <dd className="text-right">
            {room ? (
              <>
                {room.roomType.name}
                <span className="block text-xs text-foreground/60">
                  Room {room.number}, floor {room.floor}
                </span>
              </>
            ) : (
              "Not chosen"
            )}
          </dd>
        </div>
      </dl>

      <div className="border-t border-border px-5 py-4 text-sm">
        {quote ? (
          <dl className="flex flex-col gap-2">
            <div className="flex justify-between gap-4">
              <dt>
                {quote.nights} {quote.nights === 1 ? "night" : "nights"}
              </dt>
              <dd className="tabular-nums">
                {formatMoney(quote.subtotal, quote.currency)}
              </dd>
            </div>
            {quote.discountPercent > 0 && (
              <div className="flex justify-between gap-4 text-secondary">
                <dt>Early booking, {quote.discountPercent}% off</dt>
                <dd className="tabular-nums">
                  −{formatMoney(quote.discount, quote.currency)}
                </dd>
              </div>
            )}
            <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-border pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="font-[family-name:var(--font-bodoni)] text-3xl tabular-nums">
                {formatMoney(quote.total, quote.currency)}
              </dd>
            </div>
            <p className="text-xs text-foreground/60">
              Taxes included.{" "}
              {stay.packageId === "full-board"
                ? "Drinks and extras are paid at check-out."
                : "Nothing more to pay at the hotel."}
            </p>
          </dl>
        ) : (
          <p className="text-foreground/65">
            {validStay
              ? `The price for ${nights} ${nights === 1 ? "night" : "nights"} shows once you choose a room.`
              : "Choose your dates to see prices."}
          </p>
        )}
      </div>

      {nextTier && (
        <p className="border-t border-border bg-muted/40 px-5 py-3 text-sm text-foreground/75">
          Booking at least {nextTier.threshold} ahead saves {nextTier.percent}%
          on this package.
        </p>
      )}
    </aside>
  );
}
