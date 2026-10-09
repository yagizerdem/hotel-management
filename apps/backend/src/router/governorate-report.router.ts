import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as governorateReportController from "@controllers/governorate-report.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/governorate-reports:
 *   get:
 *     tags: [Governorate Reports]
 *     summary: List governorate reports
 *     responses:
 *       "200":
 *         description: Governorate reports fetched successfully
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
 *               - reportDate
 *               - status
 *               - reservations
 *               - guestCount
 *               - attempts
 *               - sentAt
 *               - responseMessage
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: reportDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact reportDate
 *       - in: query
 *         name: reportDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: reportDate greater than the value
 *       - in: query
 *         name: reportDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: reportDate greater than or equal to the value
 *       - in: query
 *         name: reportDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: reportDate less than the value
 *       - in: query
 *         name: reportDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: reportDate less than or equal to the value
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, SENT, FAILED]
 *         description: Filter by exact status
 *       - in: query
 *         name: guestCount
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Filter by exact guestCount
 *       - in: query
 *         name: guestCount[gt]
 *         schema:
 *           type: integer
 *         description: guestCount greater than the value
 *       - in: query
 *         name: guestCount[gte]
 *         schema:
 *           type: integer
 *         description: guestCount greater than or equal to the value
 *       - in: query
 *         name: guestCount[lt]
 *         schema:
 *           type: integer
 *         description: guestCount less than the value
 *       - in: query
 *         name: guestCount[lte]
 *         schema:
 *           type: integer
 *         description: guestCount less than or equal to the value
 *       - in: query
 *         name: attempts
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Filter by exact attempts
 *       - in: query
 *         name: attempts[gt]
 *         schema:
 *           type: integer
 *         description: attempts greater than the value
 *       - in: query
 *         name: attempts[gte]
 *         schema:
 *           type: integer
 *         description: attempts greater than or equal to the value
 *       - in: query
 *         name: attempts[lt]
 *         schema:
 *           type: integer
 *         description: attempts less than the value
 *       - in: query
 *         name: attempts[lte]
 *         schema:
 *           type: integer
 *         description: attempts less than or equal to the value
 *       - in: query
 *         name: sentAt
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact sentAt
 *       - in: query
 *         name: sentAt[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: sentAt greater than the value
 *       - in: query
 *         name: sentAt[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: sentAt greater than or equal to the value
 *       - in: query
 *         name: sentAt[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: sentAt less than the value
 *       - in: query
 *         name: sentAt[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: sentAt less than or equal to the value
 *       - in: query
 *         name: responseMessage
 *         schema:
 *           type: string
 *         description: Filter by exact responseMessage
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(governorateReportController.getGovernorateReports),
);

/**
 * @openapi
 * /api/governorate-reports/insert:
 *   post:
 *     tags: [Governorate Reports]
 *     summary: Insert a new governorate report
 *     requestBody:
 *       description: The governorate report to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportDate
 *             properties:
 *               reportDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [PENDING, SENT, FAILED]
 *               reservations:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Reservation id
 *               guestCount:
 *                 type: integer
 *                 minimum: 0
 *               attempts:
 *                 type: integer
 *                 minimum: 0
 *               sentAt:
 *                 type: string
 *                 format: date-time
 *               responseMessage:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Governorate report inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(governorateReportController.insertGovernorateReport),
);

/**
 * @openapi
 * /api/governorate-reports/{id}:
 *   patch:
 *     tags: [Governorate Reports]
 *     summary: Update a governorate report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The governorate report id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [PENDING, SENT, FAILED]
 *               reservations:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Reservation id
 *               guestCount:
 *                 type: integer
 *                 minimum: 0
 *               attempts:
 *                 type: integer
 *                 minimum: 0
 *               sentAt:
 *                 type: string
 *                 format: date-time
 *               responseMessage:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Governorate report updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Governorate report not found
 *   delete:
 *     tags: [Governorate Reports]
 *     summary: Delete a governorate report
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The governorate report id
 *     responses:
 *       "200":
 *         description: Governorate report deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Governorate report not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(governorateReportController.updateGovernorateReport),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(governorateReportController.deleteGovernorateReport),
);

export default router;
