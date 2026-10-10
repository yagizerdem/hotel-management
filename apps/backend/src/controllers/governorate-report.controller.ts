import { ApiResponse } from "@/util/api-response.js";
import { GovernorateReportModel } from "@/models/governorate-report.model.js";
import type { Request, Response } from "express";
import { ApiFeatures } from "@/util/api-features.js";
import { getInsertGovernorateReportValidator } from "@hotel-management/validator/governorate-report";
import {
  getGovernorateReportIdParamValidator,
  getUpdateGovernorateReportValidator,
} from "@hotel-management/validator/governorate-report";
import { parseOrThrow } from "@/util/parse-or-throw.js";
import * as governorateReportService from "@/services/governorate-report.service.js";

export async function getGovernorateReports(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(GovernorateReportModel.find(), req.query)
    .limit()
    .skip()
    .select()
    .filter();

  const governorateReportModels = await apiFeatures.mongooseQuery;

  res.send(
    ApiResponse.ok(
      governorateReportModels,
      "governorate reports fetched successfully",
    ),
  );
}

export async function insertGovernorateReport(req: Request, res: Response) {
  const validator = getInsertGovernorateReportValidator();
  const data = parseOrThrow(
    await validator.safeParseAsync(req.body),
    "insert governorate report failed",
    "/api/governorate-reports/insert",
  );

  await governorateReportService.insertGovernorateReport(data);

  res.send(ApiResponse.ok(data, "governorate report inserted successfully"));
}

export async function updateGovernorateReport(req: Request, res: Response) {
  const path = "/api/governorate-reports/:id";
  const { id } = parseOrThrow(
    await getGovernorateReportIdParamValidator().safeParseAsync(req.params),
    "update governorate report failed",
    path,
  );
  const data = parseOrThrow(
    await getUpdateGovernorateReportValidator().safeParseAsync(req.body),
    "update governorate report failed",
    path,
  );

  const governorateReport =
    await governorateReportService.updateGovernorateReport(id, data);

  res.send(
    ApiResponse.ok(
      governorateReport,
      "governorate report updated successfully",
    ),
  );
}

export async function deleteGovernorateReport(req: Request, res: Response) {
  const path = "/api/governorate-reports/:id";
  const { id } = parseOrThrow(
    await getGovernorateReportIdParamValidator().safeParseAsync(req.params),
    "delete governorate report failed",
    path,
  );

  await governorateReportService.deleteGovernorateReportById(id);

  res.send(ApiResponse.ok({ id }, "governorate report deleted successfully"));
}
