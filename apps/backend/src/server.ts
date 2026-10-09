import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import authRouter from "@router/auth.router.js";
import { swaggerSpec } from "@util/swagger.js";

if (process?.env?.NODE_ENV === "dev") {
  dotenv.config({
    path: path.resolve(fileURLToPath(import.meta.url), "../../.env.dev"),
  });
}
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

if (process.env.MONGO_URI) {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
    });
} else {
  throw Error("MONGO_URI is not defined");
}
