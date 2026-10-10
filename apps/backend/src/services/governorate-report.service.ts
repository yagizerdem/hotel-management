import { GovernorateReportModel } from "@/models/governorate-report.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertGovernorateReportDTO,
  UpdateGovernorateReportDTO,
} from "@hotel-management/validator";
import type mongoose from "mongoose";

export async function ensureGovernorateReportExistById(
  id: string,
  session?: mongoose.ClientSession,
) {
  const governorateReportFromDb = await GovernorateReportModel.findById(
    id,
  ).session(session ?? null);
  if (!governorateReportFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: `Governorate report with id ${id} does not exist`,
      isOperational: true,
    });
  }
  return governorateReportFromDb;
}

export async function ensureGovernorateReportNotExistByReportDate(
  reportDate: Date,
  session?: mongoose.ClientSession,
) {
  const governorateReportFromDb = await GovernorateReportModel.findOne({
    reportDate,
  }).session(session ?? null);
  if (governorateReportFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Governorate report with report date ${reportDate.toISOString()} already exists`,
      isOperational: true,
    });
  }
}

export async function insertGovernorateReport(
  dto: InsertGovernorateReportDTO,
  session?: mongoose.ClientSession,
) {
  await ensureGovernorateReportNotExistByReportDate(dto.reportDate, session);
  const governorateReportFromDb = await GovernorateReportModel.insertOne(dto, {
    session,
  });
  return governorateReportFromDb;
}

export async function updateGovernorateReport(
  id: string,
  dto: UpdateGovernorateReportDTO,
  session?: mongoose.ClientSession,
) {
  await ensureGovernorateReportExistById(id, session);

  const governorateReport = await GovernorateReportModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true, session },
  );

  if (!governorateReport) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "governorate report not found",
    });
  }

  return governorateReport;
}

export async function deleteGovernorateReportById(
  id: string,
  session?: mongoose.ClientSession,
) {
  await ensureGovernorateReportExistById(id, session);

  const governorateReport = await GovernorateReportModel.findByIdAndDelete(id, {
    session,
  });

  if (!governorateReport) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "governorate report not found",
    });
  }

  return governorateReport;
}
