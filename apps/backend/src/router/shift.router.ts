import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as shiftController from "@controllers/shift.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/shifts:
 *   get:
 *     tags: [Shifts]
 *     summary: List shifts
 *     responses:
 *       "200":
 *         description: Shifts fetched successfully
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
 *               - staff
 *               - date
 *               - type
 *               - startsAt
 *               - endsAt
 *               - overtimeHours
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: staff
 *         schema:
 *           type: string
 *         description: Filter by exact staff
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact date
 *       - in: query
 *         name: date[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: date greater than the value
 *       - in: query
 *         name: date[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: date greater than or equal to the value
 *       - in: query
 *         name: date[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: date less than the value
 *       - in: query
 *         name: date[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: date less than or equal to the value
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [MORNING, EVENING, NIGHT, REGULAR, DAY_OFF]
 *         description: Filter by exact type
 *       - in: query
 *         name: startsAt
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact startsAt
 *       - in: query
 *         name: startsAt[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startsAt greater than the value
 *       - in: query
 *         name: startsAt[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startsAt greater than or equal to the value
 *       - in: query
 *         name: startsAt[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startsAt less than the value
 *       - in: query
 *         name: startsAt[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startsAt less than or equal to the value
 *       - in: query
 *         name: endsAt
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact endsAt
 *       - in: query
 *         name: endsAt[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endsAt greater than the value
 *       - in: query
 *         name: endsAt[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endsAt greater than or equal to the value
 *       - in: query
 *         name: endsAt[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endsAt less than the value
 *       - in: query
 *         name: endsAt[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endsAt less than or equal to the value
 *       - in: query
 *         name: overtimeHours
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact overtimeHours
 *       - in: query
 *         name: overtimeHours[gt]
 *         schema:
 *           type: number
 *         description: overtimeHours greater than the value
 *       - in: query
 *         name: overtimeHours[gte]
 *         schema:
 *           type: number
 *         description: overtimeHours greater than or equal to the value
 *       - in: query
 *         name: overtimeHours[lt]
 *         schema:
 *           type: number
 *         description: overtimeHours less than the value
 *       - in: query
 *         name: overtimeHours[lte]
 *         schema:
 *           type: number
 *         description: overtimeHours less than or equal to the value
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(shiftController.getShifts),
);

/**
 * @openapi
 * /api/shifts/insert:
 *   post:
 *     tags: [Shifts]
 *     summary: Insert a new shift
 *     requestBody:
 *       description: The shift to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staff
 *               - date
 *               - type
 *             properties:
 *               staff:
 *                 type: string
 *                 description: Staff id
 *               date:
 *                 type: string
 *                 format: date-time
 *               type:
 *                 type: string
 *                 enum: [MORNING, EVENING, NIGHT, REGULAR, DAY_OFF]
 *               startsAt:
 *                 type: string
 *                 format: date-time
 *               endsAt:
 *                 type: string
 *                 format: date-time
 *               overtimeHours:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       "200":
 *         description: Shift inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(shiftController.insertShift),
);

/**
 * @openapi
 * /api/shifts/{id}:
 *   patch:
 *     tags: [Shifts]
 *     summary: Update a shift
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shift id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               staff:
 *                 type: string
 *                 description: Staff id
 *               date:
 *                 type: string
 *                 format: date-time
 *               type:
 *                 type: string
 *                 enum: [MORNING, EVENING, NIGHT, REGULAR, DAY_OFF]
 *               startsAt:
 *                 type: string
 *                 format: date-time
 *               endsAt:
 *                 type: string
 *                 format: date-time
 *               overtimeHours:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       "200":
 *         description: Shift updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Shift not found
 *   delete:
 *     tags: [Shifts]
 *     summary: Delete a shift
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shift id
 *     responses:
 *       "200":
 *         description: Shift deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Shift not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(shiftController.updateShift),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(shiftController.deleteShift),
);

export default router;
