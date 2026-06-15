import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import {
  CreateGovernorReportBody,
  UpdateGovernorReportBody,
} from "../lib/validators";
import { GovernorReport } from "../models/governorReport";

async function createGovernorReport(
  governorReportData: CreateGovernorReportBody,
) {
  const governorReport = new GovernorReport({ ...governorReportData });
  await governorReport.save();

  return governorReport;
}

async function deleteGovernorReportById(governorReportId: string) {
  const deletedGovernorReport =
    await GovernorReport.findByIdAndDelete(governorReportId);

  return deletedGovernorReport;
}

async function ensureGovernorReportExistById(governorReportId: string) {
  const governorReport = await GovernorReport.findById(governorReportId);

  if (!governorReport) {
    throw new AppError({
      message: `GovernorReport with id ${governorReportId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return governorReport;
}

async function updateGovernorReportById(
  governorReportId: string,
  governorReportData: UpdateGovernorReportBody,
) {
  const updatedGovernorReport = await GovernorReport.findByIdAndUpdate(
    governorReportId,
    { $set: governorReportData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedGovernorReport) {
    throw new AppError({
      message: `GovernorReport with id ${governorReportId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedGovernorReport;
}

export {
  createGovernorReport,
  deleteGovernorReportById,
  ensureGovernorReportExistById,
  updateGovernorReportById,
};
