import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as staffController from "@controllers/staff.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/staff:
 *   get:
 *     tags: [Staff]
 *     summary: List staff
 *     responses:
 *       "200":
 *         description: Staff fetched successfully
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
 *               - firstName
 *               - lastName
 *               - tcKimlikNo
 *               - phone
 *               - address
 *               - payType
 *               - hourlyWage
 *               - monthlySalary
 *               - hireDate
 *               - isActive
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by exact firstName
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by exact lastName
 *       - in: query
 *         name: tcKimlikNo
 *         schema:
 *           type: string
 *           pattern: "^\\d{11}$"
 *         description: Filter by exact tcKimlikNo
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter by exact phone
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Filter by exact address
 *       - in: query
 *         name: payType
 *         schema:
 *           type: string
 *           enum: [HOURLY, MONTHLY]
 *         description: Filter by exact payType
 *       - in: query
 *         name: hourlyWage
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact hourlyWage
 *       - in: query
 *         name: hourlyWage[gt]
 *         schema:
 *           type: number
 *         description: hourlyWage greater than the value
 *       - in: query
 *         name: hourlyWage[gte]
 *         schema:
 *           type: number
 *         description: hourlyWage greater than or equal to the value
 *       - in: query
 *         name: hourlyWage[lt]
 *         schema:
 *           type: number
 *         description: hourlyWage less than the value
 *       - in: query
 *         name: hourlyWage[lte]
 *         schema:
 *           type: number
 *         description: hourlyWage less than or equal to the value
 *       - in: query
 *         name: monthlySalary
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact monthlySalary
 *       - in: query
 *         name: monthlySalary[gt]
 *         schema:
 *           type: number
 *         description: monthlySalary greater than the value
 *       - in: query
 *         name: monthlySalary[gte]
 *         schema:
 *           type: number
 *         description: monthlySalary greater than or equal to the value
 *       - in: query
 *         name: monthlySalary[lt]
 *         schema:
 *           type: number
 *         description: monthlySalary less than the value
 *       - in: query
 *         name: monthlySalary[lte]
 *         schema:
 *           type: number
 *         description: monthlySalary less than or equal to the value
 *       - in: query
 *         name: hireDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact hireDate
 *       - in: query
 *         name: hireDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: hireDate greater than the value
 *       - in: query
 *         name: hireDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: hireDate greater than or equal to the value
 *       - in: query
 *         name: hireDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: hireDate less than the value
 *       - in: query
 *         name: hireDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: hireDate less than or equal to the value
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by exact isActive
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(staffController.getAllStaff),
);

/**
 * @openapi
 * /api/staff/insert:
 *   post:
 *     tags: [Staff]
 *     summary: Insert a new staff
 *     requestBody:
 *       description: The staff to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - tcKimlikNo
 *               - payType
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *               tcKimlikNo:
 *                 type: string
 *                 pattern: "^\\d{11}$"
 *                 example: "12345678901"
 *               phone:
 *                 type: string
 *                 minLength: 1
 *               address:
 *                 type: string
 *                 minLength: 1
 *               payType:
 *                 type: string
 *                 enum: [HOURLY, MONTHLY]
 *               hourlyWage:
 *                 type: number
 *                 minimum: 0
 *               monthlySalary:
 *                 type: number
 *                 minimum: 0
 *               hireDate:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Staff inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(staffController.insertStaff),
);

/**
 * @openapi
 * /api/staff/{id}:
 *   patch:
 *     tags: [Staff]
 *     summary: Update a staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The staff id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *               tcKimlikNo:
 *                 type: string
 *                 pattern: "^\\d{11}$"
 *                 example: "12345678901"
 *               phone:
 *                 type: string
 *                 minLength: 1
 *               address:
 *                 type: string
 *                 minLength: 1
 *               payType:
 *                 type: string
 *                 enum: [HOURLY, MONTHLY]
 *               hourlyWage:
 *                 type: number
 *                 minimum: 0
 *               monthlySalary:
 *                 type: number
 *                 minimum: 0
 *               hireDate:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Staff updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Staff not found
 *   delete:
 *     tags: [Staff]
 *     summary: Delete a staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The staff id
 *     responses:
 *       "200":
 *         description: Staff deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Staff not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(staffController.updateStaff),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(staffController.deleteStaff),
);

export default router;
