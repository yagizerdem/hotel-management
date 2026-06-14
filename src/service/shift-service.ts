import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { CreateShiftBody, UpdateShiftBody } from "../lib/validators";
import { Shift } from "../models/shift";

async function createShift(shiftData: CreateShiftBody) {
  const shift = new Shift({ ...shiftData });
  await shift.save();

  return shift;
}

async function deleteShiftById(shiftId: string) {
  const deletedShift = await Shift.findByIdAndDelete(shiftId);
  return deletedShift;
}

async function ensureShiftExistById(shiftId: string) {
  const shift = await Shift.findById(shiftId);

  if (!shift) {
    throw new AppError({
      message: `Shift with id ${shiftId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return shift;
}

async function updateShiftById(shiftId: string, shiftData: UpdateShiftBody) {
  const updatedShift = await Shift.findByIdAndUpdate(
    shiftId,
    { $set: shiftData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedShift) {
    throw new AppError({
      message: `Shift with id ${shiftId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedShift;
}

export { createShift, deleteShiftById, ensureShiftExistById, updateShiftById };
