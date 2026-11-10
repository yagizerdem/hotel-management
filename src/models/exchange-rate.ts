import { Schema, model, models, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

/**
 * Daily TRY exchange rate of one currency, fetched from a web service.
 */
const exchangeRateSchema = new Schema(
  {
    date: { type: Date, required: true },
    currency: { type: String, required: true, uppercase: true, trim: true },
    buying: { type: Number, required: true, min: 0 },
    selling: { type: Number, required: true, min: 0 },
    source: { type: String, required: true, default: "TCMB" },
  },
  { timestamps: true },
);

exchangeRateSchema.index({ date: 1, currency: 1 }, { unique: true });

export type ExchangeRate = InferSchemaType<typeof exchangeRateSchema>;
export type ExchangeRateDocument = HydratedDocument<ExchangeRate>;

const ExchangeRateModel: Model<ExchangeRate> =
  models.ExchangeRate ?? model("ExchangeRate", exchangeRateSchema);

export default ExchangeRateModel;
