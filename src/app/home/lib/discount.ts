import { earlyBookingDiscount, packages, type PackageId } from "@/src/app/home/data/hotel";

const DAY_MS = 24 * 60 * 60 * 1000;

// Online early-booking rules from the sales department:
// 3+ months ahead: 23% on every package; 1+ month ahead: 18% all inclusive,
// 16% full board; otherwise the standard nightly price.
export function getEarlyBookingDiscount(
  checkIn: Date,
  packageId: PackageId,
  today: Date = new Date(),
) {
  const daysAhead = Math.floor((checkIn.getTime() - today.getTime()) / DAY_MS);

  if (daysAhead >= 90) return earlyBookingDiscount.threeMonths;
  if (daysAhead >= 30)
    return packages.find((p) => p.id === packageId)?.earlyDiscount ?? 0;
  return 0;
}

export function countNights(checkIn: Date, checkOut: Date) {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / DAY_MS);
}
