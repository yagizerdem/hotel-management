import { ApiResponse } from "@/util/api-response.js";
import { ExchangeRateModel } from "@/models/exchange-rate.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertExchangeRateValidator } from "@hotel-management/validator/exchange-rate";
import {
  getExchangeRateIdParamValidator,
  getUpdateExchangeRateValidator,
} from "@hotel-management/validator/exchange-rate";
import HttpStatusCode from "@/util/http-status-codes.js";
import { AppError } from "@/util/app-error.js";
import { parseOrThrow } from "@/util/parse-or-throw.js";

export async function getExchangeRates(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(ExchangeRateModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const exchangeRateModels = await apiFeatures.mongooseQuery;

  res.send(
    ApiResponse.ok(exchangeRateModels, "exchange rates fetched successfully"),
  );
}

export async function insertExchangeRate(req: Request, res: Response) {
  const validator = getInsertExchangeRateValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert exchange rate failed",
    "/api/exchange-rates/insert",
  );

  await ExchangeRateModel.insertOne({
    ...data,
  });

  res.send(ApiResponse.ok(data, "exchange rate inserted successfully"));
}

export async function updateExchangeRate(req: Request, res: Response) {
  const path = "/api/exchange-rates/:id";
  const { id } = parseOrThrow(
    await getExchangeRateIdParamValidator().safeParseAsync(req.params),
    "update exchange rate failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateExchangeRateValidator().safeParseAsync(req.body),
    "update exchange rate failed",
    path,
  );

  const exchangeRate = await ExchangeRateModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!exchangeRate) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "exchange rate not found",
      path,
    });
  }

  res.send(ApiResponse.ok(exchangeRate, "exchange rate updated successfully"));
}

export async function deleteExchangeRate(req: Request, res: Response) {
  const path = "/api/exchange-rates/:id";
  const { id } = parseOrThrow(
    await getExchangeRateIdParamValidator().safeParseAsync(req.params),
    "delete exchange rate failed",
    path,
  );

  const exchangeRate = await ExchangeRateModel.findByIdAndDelete(id);

  if (!exchangeRate) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "exchange rate not found",
      path,
    });
  }

  res.send(ApiResponse.ok({ id }, "exchange rate deleted successfully"));
}
