import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { CURRENCIES } from "./constants";

// Daily value of one unit of `currency` in TRY, fetched from a web service
const exchangeRateSchema = new Schema(
  {
    currency: { type: String, enum: CURRENCIES, required: true },
    date: { type: Date, required: true },
    rate: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

exchangeRateSchema.index({ currency: 1, date: 1 }, { unique: true });

export type ExchangeRate = InferSchemaType<typeof exchangeRateSchema>;
export const ExchangeRateModel =
  (models.ExchangeRate as Model<ExchangeRate>) ||
  model<ExchangeRate>("ExchangeRate", exchangeRateSchema);
