import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import authRouter from "@router/auth.router.js";
import roomRouter from "@router/room.router.js";
import roomBlockRouter from "@router/room-block.router.js";
import pricingRouter from "@router/pricing.router.js";
import discountRuleRouter from "@router/discount-rule.router.js";
import customerRouter from "@router/customer.router.js";
import userRouter from "@router/user.router.js";
import staffRouter from "@router/staff.router.js";
import shiftRouter from "@router/shift.router.js";
import reservationRouter from "@router/reservation.router.js";
import extraChargeRouter from "@router/extra-charge.router.js";
import exchangeRateRouter from "@router/exchange-rate.router.js";
import governorateReportRouter from "@router/governorate-report.router.js";
import backupLogRouter from "@router/backup-log.router.js";
import { swaggerSpec } from "@util/swagger.js";
import { errorHandler, notFoundHandler } from "@middleware/error-handler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/room-blocks", roomBlockRouter);
app.use("/api/pricings", pricingRouter);
app.use("/api/discount-rules", discountRuleRouter);
app.use("/api/customers", customerRouter);
app.use("/api/users", userRouter);
app.use("/api/staff", staffRouter);
app.use("/api/shifts", shiftRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/extra-charges", extraChargeRouter);
app.use("/api/exchange-rates", exchangeRateRouter);
app.use("/api/governorate-reports", governorateReportRouter);
app.use("/api/backup-logs", backupLogRouter);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
