import { GovernorateReportModel } from "@/models/governorate-report.model.js";
import { AppError } from "@/util/app-error.js";
import HttpStatusCode from "@/util/http-status-codes.js";
import type {
  InsertGovernorateReportDTO,
  UpdateGovernorateReportDTO,
} from "@hotel-management/validator";

export async function ensureGovernorateReportExistById(id: string) {
  const governorateReportFromDb = await GovernorateReportModel.findById(id);
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
) {
  const governorateReportFromDb = await GovernorateReportModel.findOne({
    reportDate,
  });
  if (governorateReportFromDb) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.CONFLICT,
      message: `Governorate report with report date ${reportDate.toISOString()} already exists`,
      isOperational: true,
    });
  }
}

export async function insertGovernorateReport(dto: InsertGovernorateReportDTO) {
  await ensureGovernorateReportNotExistByReportDate(dto.reportDate);
  const governorateReportFromDb = await GovernorateReportModel.insertOne(dto);
  return governorateReportFromDb;
}

export async function updateGovernorateReport(
  id: string,
  dto: UpdateGovernorateReportDTO,
) {
  await ensureGovernorateReportExistById(id);

  const governorateReport = await GovernorateReportModel.findByIdAndUpdate(
    id,
    { $set: dto },
    { new: true, runValidators: true },
  );

  if (!governorateReport) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "governorate report not found",
    });
  }

  return governorateReport;
}

export async function deleteGovernorateReportById(id: string) {
  await ensureGovernorateReportExistById(id);

  const governorateReport = await GovernorateReportModel.findByIdAndDelete(id);

  if (!governorateReport) {
    throw AppError.from({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: "governorate report not found",
    });
  }

  return governorateReport;
}
