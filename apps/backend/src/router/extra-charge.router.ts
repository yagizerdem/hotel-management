import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as extraChargeController from "@controllers/extra-charge.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/extra-charges:
 *   get:
 *     tags: [Extra Charges]
 *     summary: List extra charges
 *     responses:
 *       "200":
 *         description: Extra charges fetched successfully
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
 *               - reservation
 *               - category
 *               - description
 *               - quantity
 *               - unitPrice
 *               - chargedAt
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: reservation
 *         schema:
 *           type: string
 *         description: Filter by exact reservation
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [MINIBAR, BAR, SNACKBAR, RESTAURANT, OTHER]
 *         description: Filter by exact category
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filter by exact description
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Filter by exact quantity
 *       - in: query
 *         name: quantity[gt]
 *         schema:
 *           type: integer
 *         description: quantity greater than the value
 *       - in: query
 *         name: quantity[gte]
 *         schema:
 *           type: integer
 *         description: quantity greater than or equal to the value
 *       - in: query
 *         name: quantity[lt]
 *         schema:
 *           type: integer
 *         description: quantity less than the value
 *       - in: query
 *         name: quantity[lte]
 *         schema:
 *           type: integer
 *         description: quantity less than or equal to the value
 *       - in: query
 *         name: unitPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact unitPrice
 *       - in: query
 *         name: unitPrice[gt]
 *         schema:
 *           type: number
 *         description: unitPrice greater than the value
 *       - in: query
 *         name: unitPrice[gte]
 *         schema:
 *           type: number
 *         description: unitPrice greater than or equal to the value
 *       - in: query
 *         name: unitPrice[lt]
 *         schema:
 *           type: number
 *         description: unitPrice less than the value
 *       - in: query
 *         name: unitPrice[lte]
 *         schema:
 *           type: number
 *         description: unitPrice less than or equal to the value
 *       - in: query
 *         name: chargedAt
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact chargedAt
 *       - in: query
 *         name: chargedAt[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: chargedAt greater than the value
 *       - in: query
 *         name: chargedAt[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: chargedAt greater than or equal to the value
 *       - in: query
 *         name: chargedAt[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: chargedAt less than the value
 *       - in: query
 *         name: chargedAt[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: chargedAt less than or equal to the value
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(extraChargeController.getExtraCharges),
);

/**
 * @openapi
 * /api/extra-charges/insert:
 *   post:
 *     tags: [Extra Charges]
 *     summary: Insert a new extra charge
 *     requestBody:
 *       description: The extra charge to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservation
 *               - category
 *               - description
 *               - unitPrice
 *             properties:
 *               reservation:
 *                 type: string
 *                 description: Reservation id
 *               category:
 *                 type: string
 *                 enum: [MINIBAR, BAR, SNACKBAR, RESTAURANT, OTHER]
 *               description:
 *                 type: string
 *                 minLength: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               unitPrice:
 *                 type: number
 *                 minimum: 0
 *               chargedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       "200":
 *         description: Extra charge inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(extraChargeController.insertExtraCharge),
);

/**
 * @openapi
 * /api/extra-charges/{id}:
 *   patch:
 *     tags: [Extra Charges]
 *     summary: Update a extra charge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The extra charge id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservation:
 *                 type: string
 *                 description: Reservation id
 *               category:
 *                 type: string
 *                 enum: [MINIBAR, BAR, SNACKBAR, RESTAURANT, OTHER]
 *               description:
 *                 type: string
 *                 minLength: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               unitPrice:
 *                 type: number
 *                 minimum: 0
 *               chargedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       "200":
 *         description: Extra charge updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Extra charge not found
 *   delete:
 *     tags: [Extra Charges]
 *     summary: Delete a extra charge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The extra charge id
 *     responses:
 *       "200":
 *         description: Extra charge deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Extra charge not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(extraChargeController.updateExtraCharge),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(extraChargeController.deleteExtraCharge),
);

export default router;
