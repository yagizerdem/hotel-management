import express from "express";
const router = express.Router();
import * as authController from "@controllers/auth.controller.js";

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", authController.register);

export default router;
