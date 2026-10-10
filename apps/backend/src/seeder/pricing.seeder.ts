import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { connectToDatabase } from "@/db.js";
import { BoardType, Currency, RoomType } from "@hotel-management/models";
import { PricingModel } from "@/models/pricing.model.js";

dotenv.config({
  path: path.resolve(fileURLToPath(import.meta.url), "../../../.env.dev"),
});

const FIRST_YEAR = 2025;
const LAST_YEAR = 2028;

// Full board nightly price in USD for a month with factor 1 in FIRST_YEAR.
const BASE_PRICE: Record<RoomType, number> = {
  [RoomType.SINGLE]: 60,
  [RoomType.TWIN]: 85,
  [RoomType.DOUBLE]: 95,
  [RoomType.TRIPLE_SINGLES]: 120,
  [RoomType.TRIPLE_MIXED]: 125,
  [RoomType.QUAD]: 160,
  [RoomType.ROYAL_SUITE]: 400,
};

const BOARD_MULTIPLIER: Record<BoardType, number> = {
  [BoardType.FULL_BOARD]: 1,
  [BoardType.ALL_INCLUSIVE]: 1.35,
};

// Index 0 is January. Every month has its own factor, peaking in summer.
const MONTH_FACTOR = [
  0.8, 0.82, 0.9, 0.98, 1.05, 1.2, 1.4, 1.45, 1.2, 1.0, 0.85, 0.95,
];

const YEARLY_INCREASE = 1.05;

function buildPricings() {
  const pricings = [];

  for (let year = FIRST_YEAR; year <= LAST_YEAR; year++) {
    for (let month = 0; month < 12; month++) {
      // Whole month, from the first instant to the last millisecond (UTC).
      const startDate = new Date(Date.UTC(year, month, 1));
      const endDate = new Date(Date.UTC(year, month + 1, 1) - 1);
      const factor =
        MONTH_FACTOR[month]! * YEARLY_INCREASE ** (year - FIRST_YEAR);

      for (const roomType of Object.values(RoomType)) {
        for (const boardType of Object.values(BoardType)) {
          pricings.push({
            roomType,
            boardType,
            startDate,
            endDate,
            nightlyPrice:
              Math.round(
                BASE_PRICE[roomType] *
                  BOARD_MULTIPLIER[boardType] *
                  factor *
                  100,
              ) / 100,
            currency: Currency.USD,
          });
        }
      }
    }
  }

  return pricings;
}

// Idempotent: existing pricings (matched by room type, board type and month)
// are left untouched.
export async function seedPricings() {
  const pricings = buildPricings();

  const result = await PricingModel.bulkWrite(
    pricings.map((pricing) => ({
      updateOne: {
        filter: {
          roomType: pricing.roomType,
          boardType: pricing.boardType,
          startDate: pricing.startDate,
        },
        update: { $setOnInsert: pricing },
        upsert: true,
      },
    })),
  );

  console.log(
    `Pricings seeded: ${result.upsertedCount} created, ${pricings.length - result.upsertedCount} already existed`,
  );
}

await connectToDatabase();
try {
  await seedPricings();
} finally {
  await mongoose.disconnect();
}
