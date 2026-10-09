import { z } from "zod";
import { ReportStatus } from "@hotel-management/models";

export function getInsertGovernorateReportValidator() {
  const validator = z.object({
    reportDate: z.coerce.date(),
    status: z.enum(ReportStatus).optional(),
    reservations: z
      .array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid id."))
      .optional(),
    guestCount: z.number().int().min(0).optional(),
    attempts: z.number().int().min(0).optional(),
    sentAt: z.coerce.date().optional(),
    responseMessage: z.string().optional(),
  });

  return validator;
}

export function getGovernorateReportIdParamValidator() {
  return z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid governorate report id."),
  });
}

export function getUpdateGovernorateReportValidator() {
  return z
    .object({
      reportDate: z.coerce.date(),
      status: z.enum(ReportStatus),
      reservations: z.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid id.")),
      guestCount: z.number().int().min(0),
      attempts: z.number().int().min(0),
      sentAt: z.coerce.date(),
      responseMessage: z.string(),
    })
    .partial()
    .refine((governorateReport) => Object.keys(governorateReport).length > 0, {
      message: "At least one field is required.",
    });
}

export type GovernorateReportIdParamDTO = z.infer<
  ReturnType<typeof getGovernorateReportIdParamValidator>
>;
export type UpdateGovernorateReportDTO = z.infer<
  ReturnType<typeof getUpdateGovernorateReportValidator>
>;

export type InsertGovernorateReportDTO = z.infer<
  ReturnType<typeof getInsertGovernorateReportValidator>
>;
