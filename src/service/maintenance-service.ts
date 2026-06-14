import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import {
  CreateMaintenanceBody,
  UpdateMaintenanceBody,
} from "../lib/validators";
import { Maintenance } from "../models/maintenance";
import { Price } from "../models/price";

async function createMaintenance(maintenanceData: CreateMaintenanceBody) {
  const maintenance = new Price({ ...maintenanceData });
  await maintenance.save();

  return maintenance;
}

async function deleteByMaintenanceById(maintenanceId: string) {
  const deletedMaintenance = await Price.findByIdAndDelete(maintenanceId);
  return deletedMaintenance;
}

async function ensureMaintenanceExistById(maintenanceId: string) {
  const maintenance = await Price.findById(maintenanceId);
  if (!maintenance) {
    throw new AppError({
      message: `Maintenance with id ${maintenanceId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return maintenance;
}

async function updateMaintenanceById(
  maintenanceId: string,
  maintenanceData: UpdateMaintenanceBody,
) {
  const updatedMaintenance = await Maintenance.findByIdAndUpdate(
    maintenanceId,
    { $set: maintenanceData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedMaintenance) {
    throw new AppError({
      message: `Maintenance with id ${maintenanceId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedMaintenance;
}

export {
  createMaintenance,
  deleteByMaintenanceById,
  ensureMaintenanceExistById,
  updateMaintenanceById,
};
