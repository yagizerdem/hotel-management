import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as userController from "@controllers/user.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: List users
 *     responses:
 *       "200":
 *         description: Users fetched successfully
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *       - in: query
 *         name: select
 *         schema:
 *           type: array
 *           uniqueItems: true
 *           items:
 *             type: string
 *             enum:
 *               - email
 *               - role
 *               - staff
 *               - customer
 *               - isActive
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter by exact email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [MANAGER, RECEPTIONIST, IT_ADMIN, CUSTOMER, HOUSEKEEPER, COOK, WAITER, ELECTRICIAN, IT_SPECIALIST, ADMIN]
 *         description: Filter by exact role
 *       - in: query
 *         name: staff
 *         schema:
 *           type: string
 *         description: Filter by exact staff
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *         description: Filter by exact customer
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by exact isActive
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN]),
  asyncWrapper(userController.getUsers),
);

/**
 * @openapi
 * /api/users/insert:
 *   post:
 *     tags: [Users]
 *     summary: Insert a new user
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
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: At least 8 characters with upper and lower case letters, a number and a special character
 *               role:
 *                 type: string
 *                 enum: [MANAGER, RECEPTIONIST, IT_ADMIN, CUSTOMER, HOUSEKEEPER, COOK, WAITER, ELECTRICIAN, IT_SPECIALIST, ADMIN]
 *               staff:
 *                 type: string
 *                 description: Staff id
 *               customer:
 *                 type: string
 *                 description: Customer id
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: User inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN]),
  asyncWrapper(userController.insertUser),
);

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: At least 8 characters with upper and lower case letters, a number and a special character
 *               role:
 *                 type: string
 *                 enum: [MANAGER, RECEPTIONIST, IT_ADMIN, CUSTOMER, HOUSEKEEPER, COOK, WAITER, ELECTRICIAN, IT_SPECIALIST, ADMIN]
 *               staff:
 *                 type: string
 *                 description: Staff id
 *               customer:
 *                 type: string
 *                 description: Customer id
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: User updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: User not found
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       "200":
 *         description: User deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: User not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN]),
  asyncWrapper(userController.updateUser),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN]),
  asyncWrapper(userController.deleteUser),
);

export default router;
