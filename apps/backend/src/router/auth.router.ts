import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as authController from "@controllers/auth.controller.js";

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       description: The user to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 default: ""
 *               password:
 *                 type: string
 *                 format: password
 *                 default: ""
 *     responses:
 *       "201":
 *         description: User registered successfully
 */
router.post("/register", asyncWrapper(authController.register));

export default router;
