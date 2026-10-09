import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "@/app.js";
import { connectToDatabase } from "@/db.js";

if (process?.env?.NODE_ENV === "development") {
  dotenv.config({
    path: path.resolve(fileURLToPath(import.meta.url), "../../.env.dev"),
  });
}

await connectToDatabase();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
