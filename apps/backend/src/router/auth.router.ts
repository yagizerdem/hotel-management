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
 *                 default: "test@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 default: "12345aA!"
 *     responses:
 *       "201":
 *         description: User registered successfully
 */
router.post("/register", asyncWrapper(authController.register));

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in a user
 *     requestBody:
 *       description: The user credentials
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
 *                 default: "test@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 default: "12345aA!"
 *     responses:
 *       "200":
 *         description: Login successful, accessToken and refreshToken cookies set
 *       "400":
 *         description: Invalid request body
 *       "401":
 *         description: Invalid credentials
 */
router.post("/login", asyncWrapper(authController.login));

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Issue a new access token using the refreshToken cookie
 *     responses:
 *       "200":
 *         description: New accessToken cookie set
 *       "401":
 *         description: Missing, invalid, expired or revoked refresh token
 */
router.post("/refresh", asyncWrapper(authController.refresh));

export default router;
