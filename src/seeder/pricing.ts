import type { Types } from "mongoose";
import EarlyBookingDiscountModel, { type EarlyBookingDiscountDocument } from "@models/early-booking-discount";
import ExchangeRateModel from "@models/exchange-rate";
import RoomRateModel, { BOARD_TYPES, type BoardType } from "@models/room-rate";
import type { RoomTypeDocument } from "@models/room-type";
import { addDays, eachDay, faker, money } from "@seeder/utils";

// Full board nightly price in TRY outside the high season.
const BASE_PRICES: Record<string, number> = {
  single: 3000,
  twin: 4200,
  "triple-twin": 5400,
  double: 4500,
  triple: 5800,
  family: 7200,
  "king-suite": 18000,
};

const BOARD_MULTIPLIERS: Record<BoardType, number> = {
  full_board: 1,
  all_inclusive: 1.3,
};

function seasonMultiplier(month: number): number {
  // June to September is the high season, May and October the shoulder season.
  if (month >= 5 && month <= 8) return 1.6;
  if (month === 4 || month === 9) return 1.25;
  return 1;
}

/**
 * One rate per room type and board type for every month that touches the
 * range. Returns a lookup for the nightly price of a given night.
 */
export async function seedRoomRates(roomTypes: RoomTypeDocument[], from: Date, to: Date, createdBy: Types.ObjectId) {
  const rates = [];
  let monthStart = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), 1));

  while (monthStart < to) {
    const nextMonthStart = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1));

    for (const roomType of roomTypes) {
      for (const boardType of BOARD_TYPES) {
        const price =
          BASE_PRICES[roomType.code] * BOARD_MULTIPLIERS[boardType] * seasonMultiplier(monthStart.getUTCMonth());

        rates.push({
          roomType: roomType._id,
          boardType,
          validFrom: monthStart,
          validTo: addDays(nextMonthStart, -1),
          nightlyPrice: Math.round(price / 50) * 50,
          createdBy,
        });
      }
    }

    monthStart = nextMonthStart;
  }

  const inserted = await RoomRateModel.insertMany(rates);
  const priceByKey = new Map(
    inserted.map((rate) => [`${rate.roomType}:${rate.boardType}:${rate.validFrom.toISOString()}`, rate.nightlyPrice]),
  );

  const priceOf = (roomType: Types.ObjectId, boardType: BoardType, night: Date) => {
    const monthStartOfNight = new Date(Date.UTC(night.getUTCFullYear(), night.getUTCMonth(), 1));
    const price = priceByKey.get(`${roomType}:${boardType}:${monthStartOfNight.toISOString()}`);
    if (price === undefined) {
      throw new Error(`No rate for ${roomType} ${boardType} on ${night.toISOString()}`);
    }
    return price;
  };

  return { count: inserted.length, priceOf };
}

// Web-only early booking discounts from the sales department.
export async function seedEarlyBookingDiscounts() {
  return EarlyBookingDiscountModel.insertMany([
    { name: "Erken rezervasyon - her şey dahil", minDaysBefore: 30, boardType: "all_inclusive", percent: 18 },
    { name: "Erken rezervasyon - tam pansiyon", minDaysBefore: 30, boardType: "full_board", percent: 16 },
    { name: "Süper erken rezervasyon", minDaysBefore: 90, percent: 23 },
  ]);
}

/**
 * The highest discount that applies to a web booking made `leadDays`
 * before check-in, if any.
 */
export function bestDiscount(discounts: EarlyBookingDiscountDocument[], boardType: BoardType, leadDays: number) {
  return discounts
    .filter((discount) => leadDays >= discount.minDaysBefore && (!discount.boardType || discount.boardType === boardType))
    .sort((a, b) => b.percent - a.percent)[0];
}

const STARTING_RATES = { USD: 41, EUR: 47.5, GBP: 54.5 };

/**
 * Daily rates as a gentle random walk, so charts and conversions look real.
 */
export async function seedExchangeRates(from: Date, to: Date) {
  const current = { ...STARTING_RATES };
  const rates = eachDay(from, addDays(to, 1)).flatMap((date) =>
    Object.entries(current).map(([currency, rate]) => {
      const next = rate * (1 + faker.number.float({ min: -0.004, max: 0.005 }));
      current[currency as keyof typeof current] = next;
      return {
        date,
        currency,
        buying: money(next),
        selling: money(next * 1.005),
      };
    }),
  );

  return ExchangeRateModel.insertMany(rates);
}
