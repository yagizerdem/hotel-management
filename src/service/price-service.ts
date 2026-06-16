import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { CreatePriceBody, UpdatePriceBody } from "../lib/validators";
import { Price } from "../models/price";

async function createPrice(priceData: CreatePriceBody) {
  const price = new Price({ ...priceData });

  const exist = await Price.exists({
    roomType: priceData.roomType,
    packageType: priceData.packageType,
    validFrom: { $lt: priceData.validTo },
    validTo: { $gt: priceData.validFrom },
  });

  if (exist) {
    throw new AppError({
      message: `Price for room type ${priceData.roomType} and package type ${priceData.packageType} already exists for the given date range`,
      statusCode: HttpStatusCode.CONFLICT,
      isOperational: true,
    });
  }

  await price.save();

  return price;
}

async function deleteByPriceById(priceId: string) {
  const deletedPrice = await Price.findByIdAndDelete(priceId);
  return deletedPrice;
}

async function ensurePriceExistById(priceId: string) {
  const price = await Price.findById(priceId);
  if (!price) {
    throw new AppError({
      message: `Price with id ${priceId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return price;
}

async function updatePriceById(priceId: string, priceData: UpdatePriceBody) {
  const updatedPrice = await Price.findByIdAndUpdate(
    priceId,
    { $set: priceData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedPrice) {
    throw new AppError({
      message: `Price with id ${priceId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedPrice;
}

export {
  createPrice,
  deleteByPriceById,
  ensurePriceExistById,
  updatePriceById,
};
