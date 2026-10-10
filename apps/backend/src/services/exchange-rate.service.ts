import { ExchangeRateModel } from "@/models/exchange-rate.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type { Currency } from "@hotel-management/models";
import type {
  InsertExchangeRateDTO,
  UpdateExchangeRateDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureExchangeRateExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const exchangeRateFromDb = await ExchangeRateModel.findById(id).session(
    session ?? null,
  );
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
  session?: mongoose.ClientSession,
) {
  const exchangeRateFromDb = await ExchangeRateModel.findOne({
    date,
    currency,
  }).session(session ?? null);
  if (exchangeRateFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Exchange rate with date ${date.toISOString()} and currency ${currency} already exists`,
      isOperational: true,
    });
  }
}

export async function insertExchangeRate(
  dto: InsertExchangeRateDTO,
  session?: mongoose.ClientSession,
) {
  await ensureExchangeRateNotExistByDateAndCurrency(
    dto.date,
    dto.currency,
    session,
  );
  const exchangeRateFromDb = await ExchangeRateModel.insertOne(dto, {
    session,
  });
  return exchangeRateFromDb;
}

export async function updateExchangeRate(
  id: string,
  dto: UpdateExchangeRateDTO,
  session?: mongoose.ClientSession,
) {
  await ensureExchangeRateExistById(id, session);

  const exchangeRate = await ExchangeRateModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!exchangeRate) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "exchange rate not found",
    });
  }

  return exchangeRate;
}

export async function deleteExchangeRateById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureExchangeRateExistById(id, session);

  const exchangeRate = await ExchangeRateModel.findByIdAndDelete(id, {
    session,
  });

  if (!exchangeRate) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "exchange rate not found",
    });
  }

  return exchangeRate;
}
