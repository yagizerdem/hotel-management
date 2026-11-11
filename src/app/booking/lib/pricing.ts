import type { AvailableRoom } from "@domain/home/room";
import type { PackageId } from "@/src/app/home/data/sd";
import {
  countNights,
  getEarlyBookingDiscount,
} from "@/src/app/home/lib/discount";
import type { Quote, StayDetails } from "@/src/app/booking/lib/types";

const DAY_MS = 24 * 60 * 60 * 1000;

/** A yyyy-mm-dd string as a local date at midnight. */
export function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toInputDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function today() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

/** Why the stay can't be searched, or null when it can. */
export function stayError(stay: StayDetails): string | null {
  if (!stay.checkIn || !stay.checkOut)
    return "Choose your check-in and check-out dates.";
  const start = parseDate(stay.checkIn);
  const end = parseDate(stay.checkOut);
  if (start < today()) return "Check-in can't be in the past.";
  if (countNights(start, end) < 1)
    return "Check-out must be at least one day after check-in.";
  if (countNights(start, end) > 30)
    return "Online bookings are for up to 30 nights.";
  return null;
}

export function nightsOf(stay: StayDetails) {
  return countNights(parseDate(stay.checkIn), parseDate(stay.checkOut));
}

/** The room's price for the stay, with the early-booking discount. */
export function quoteFor(room: AvailableRoom, stay: StayDetails): Quote {
  const subtotal = room.pricing.total;
  const discountPercent = getEarlyBookingDiscount(
    parseDate(stay.checkIn),
    stay.packageId,
    today(),
  );
  const discount = Math.round((subtotal * discountPercent) / 100);
  return {
    nights: room.pricing.nights,
    subtotal,
    discountPercent,
    discount,
    total: subtotal - discount,
    currency: room.pricing.currency,
  };
}

/**
 * When booking a little earlier would unlock a discount, how many days
 * earlier and what it would be. Used to tell guests about the next tier.
 */
export function nextDiscountTier(stay: StayDetails, packageId: PackageId) {
  if (!stay.checkIn) return null;
  const daysAhead = Math.floor(
    (parseDate(stay.checkIn).getTime() - today().getTime()) / DAY_MS,
  );
  const current = getEarlyBookingDiscount(
    parseDate(stay.checkIn),
    packageId,
    today(),
  );
  if (daysAhead < 30 && current === 0) {
    return {
      threshold: "a month",
      percent: packageId === "all-inclusive" ? 18 : 16,
    };
  }
  if (daysAhead < 90) return { threshold: "three months", percent: 23 };
  return null;
}

export function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatStayDate(value: string) {
  return value ? longDate.format(parseDate(value)) : "";
}
