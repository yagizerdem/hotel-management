import HttpStatusCode from "@/util/http-status-codes.js";
import type { Request, Response } from "express";

export function register(req: Request, res: Response) {
  res
    .status(HttpStatusCode.CREATED)
    .send({ message: "User registered successfully" });
}
