import { ExchangeRateModel } from "@/models/exchange-rate.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type { Currency } from "@hotel-management/models";
import type {
  InsertExchangeRateDTO,
  UpdateExchangeRateDTO,
} from "@hotel-management/validator";

export async function ensureExchangeRateExistById(id: string) {
  const exchangeRateFromDb = await ExchangeRateModel.findById(id);
  if (!exchangeRateFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Exchange rate with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return exchangeRateFromDb;
}

export async function ensureExchangeRateNotExistByDateAndCurrency(
  date: Date,
  currency: Currency,
) {
  const exchangeRateFromDb = await ExchangeRateModel.findOne({
    date,
    currency,
  });
  if (exchangeRateFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Exchange rate with date ${date.toISOString()} and currency ${currency} already exists`,
      isOperational: true,
    });
  }
}

export async function insertExchangeRate(dto: InsertExchangeRateDTO) {
  await ensureExchangeRateNotExistByDateAndCurrency(dto.date, dto.currency);
  const exchangeRateFromDb = await ExchangeRateModel.insertOne(dto);
  return exchangeRateFromDb;
}

export async function updateExchangeRate(
  id: string,
  dto: UpdateExchangeRateDTO,
) {
  await ensureExchangeRateExistById(id);

  const exchangeRate = await ExchangeRateModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!exchangeRate) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "exchange rate not found",
    });
  }

  return exchangeRate;
}

export async function deleteExchangeRateById(id: string) {
  await ensureExchangeRateExistById(id);

  const exchangeRate = await ExchangeRateModel.findByIdAndDelete(id);

  if (!exchangeRate) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "exchange rate not found",
    });
  }

  return exchangeRate;
}
