import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";

const srcDir = path.resolve(fileURLToPath(import.meta.url), "../..");

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Hotel Management API",
      version: "0.0.0",
    },
    servers: [{ url: "/" }],
  },
  apis: [path.join(srcDir, "router", "*.{ts,js}").replaceAll("\\", "/")],
});
