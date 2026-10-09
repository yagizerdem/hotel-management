import { Schema, model, type InferSchemaType } from "mongoose";
import { Currency } from "./enums.js";

const exchangeRateSchema = new Schema(
  {
    date: { type: Date, required: true },
    currency: { type: String, enum: Object.values(Currency), required: true },
    buyRate: { type: Number, required: true, min: 0 },
    sellRate: { type: Number, required: true, min: 0 },
    source: { type: String, trim: true },
  },
  { timestamps: true },
);

exchangeRateSchema.index({ date: 1, currency: 1 }, { unique: true });

export type ExchangeRate = InferSchemaType<typeof exchangeRateSchema>;
export const ExchangeRateModel = model("ExchangeRate", exchangeRateSchema);
