import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import authRouter from "@router/auth.router.js";
import roomRouter from "@router/room.router.js";
import { swaggerSpec } from "@util/swagger.js";
import { errorHandler, notFoundHandler } from "@middleware/error-handler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
