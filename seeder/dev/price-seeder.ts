import dotenv from "dotenv";
import { Price } from "../../src/models/price";
import mongoose from "mongoose";

dotenv.config({
  path: process.cwd() + "/.env.local",
});

const roomTypes = [
  "SINGLE",
  "DOUBLE_TWIN",
  "DOUBLE_DUBLE",
  "TRIPLE_SINGLE",
  "TRIPLE_MIXED",
  "QUAD",
  "KING_SUITE",
];

const packageTypes = ["FULL_BOARD", "ALL_INCLUSIVE"];

const basePrices: Record<string, number> = {
  SINGLE: 80,
  DOUBLE_TWIN: 120,
  DOUBLE_DUBLE: 130,
  TRIPLE_SINGLE: 160,
  TRIPLE_MIXED: 170,
  QUAD: 210,
  KING_SUITE: 350,
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

async function seedPrices() {
  await mongoose.connect(process.env.MONGODB_URI!);

  await Price.deleteMany({});

  const prices = [];

  let start = new Date("2025-01-01T00:00:00.000Z");
  const end = new Date("2027-01-01T00:00:00.000Z");

  while (start < end) {
    const validFrom = start;
    const validTo = addMonths(start, 2);

    for (const roomType of roomTypes) {
      for (const packageType of packageTypes) {
        let nightlyPrice = basePrices[roomType];

        if (packageType === "ALL_INCLUSIVE") {
          nightlyPrice += 40;
        }

        prices.push({
          roomType,
          packageType,
          nightlyPrice,
          currency: "USD",
          validFrom,
          validTo,
        });
      }
    }

    start = validTo;
  }

  await Price.insertMany(prices);

  console.log(`${prices.length} prices seeded`);
}

seedPrices()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
