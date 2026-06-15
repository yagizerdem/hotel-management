import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import {
  CreateExtraExpenseBody,
  UpdateExtraExpenseBody,
} from "../lib/validators";
import { ExtraExpense } from "../models/extraExpense";

async function createExtraExpense(extraExpenseData: CreateExtraExpenseBody) {
  const extraExpense = new ExtraExpense({ ...extraExpenseData });
  await extraExpense.save();

  return extraExpense;
}

async function deleteExtraExpenseById(extraExpenseId: string) {
  const deletedExtraExpense =
    await ExtraExpense.findByIdAndDelete(extraExpenseId);

  return deletedExtraExpense;
}

async function ensureExtraExpenseExistById(extraExpenseId: string) {
  const extraExpense = await ExtraExpense.findById(extraExpenseId);

  if (!extraExpense) {
    throw new AppError({
      message: `ExtraExpense with id ${extraExpenseId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return extraExpense;
}

async function updateExtraExpenseById(
  extraExpenseId: string,
  extraExpenseData: UpdateExtraExpenseBody,
) {
  const updatedExtraExpense = await ExtraExpense.findByIdAndUpdate(
    extraExpenseId,
    { $set: extraExpenseData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedExtraExpense) {
    throw new AppError({
      message: `ExtraExpense with id ${extraExpenseId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedExtraExpense;
}

export {
  createExtraExpense,
  deleteExtraExpenseById,
  ensureExtraExpenseExistById,
  updateExtraExpenseById,
};
