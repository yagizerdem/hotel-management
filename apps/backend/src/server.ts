import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

if (process?.env?.NODE_ENV === "dev") {
  dotenv.config({
    path: path.resolve(fileURLToPath(import.meta.url), "../../.env.dev"),
  });
}
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

if (process.env.MONGO_URI) {
  await mongoose.connect(process.env.MONGO_URI).finally(() => {
    console.log("Connected to MongoDB");
  });
} else {
  throw Error("MONGO_URI is not defined");
}
