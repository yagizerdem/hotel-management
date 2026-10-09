import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as discountRuleController from "@controllers/discount-rule.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/discount-rules:
 *   get:
 *     tags: [Discount Rules]
 *     summary: List discount rules
 *     responses:
 *       "200":
 *         description: Discount rules fetched successfully
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
 *               - boardType
 *               - minDaysInAdvance
 *               - ratePercent
 *               - isActive
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: boardType
 *         schema:
 *           type: string
 *           enum: [FULL_BOARD, ALL_INCLUSIVE]
 *         description: Filter by exact boardType
 *       - in: query
 *         name: minDaysInAdvance
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Filter by exact minDaysInAdvance
 *       - in: query
 *         name: minDaysInAdvance[gt]
 *         schema:
 *           type: integer
 *         description: minDaysInAdvance greater than the value
 *       - in: query
 *         name: minDaysInAdvance[gte]
 *         schema:
 *           type: integer
 *         description: minDaysInAdvance greater than or equal to the value
 *       - in: query
 *         name: minDaysInAdvance[lt]
 *         schema:
 *           type: integer
 *         description: minDaysInAdvance less than the value
 *       - in: query
 *         name: minDaysInAdvance[lte]
 *         schema:
 *           type: integer
 *         description: minDaysInAdvance less than or equal to the value
 *       - in: query
 *         name: ratePercent
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         description: Filter by exact ratePercent
 *       - in: query
 *         name: ratePercent[gt]
 *         schema:
 *           type: number
 *         description: ratePercent greater than the value
 *       - in: query
 *         name: ratePercent[gte]
 *         schema:
 *           type: number
 *         description: ratePercent greater than or equal to the value
 *       - in: query
 *         name: ratePercent[lt]
 *         schema:
 *           type: number
 *         description: ratePercent less than the value
 *       - in: query
 *         name: ratePercent[lte]
 *         schema:
 *           type: number
 *         description: ratePercent less than or equal to the value
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
  asyncWrapper(discountRuleController.getDiscountRules),
);

/**
 * @openapi
 * /api/discount-rules/insert:
 *   post:
 *     tags: [Discount Rules]
 *     summary: Insert a new discount rule
 *     requestBody:
 *       description: The discount rule to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - minDaysInAdvance
 *               - ratePercent
 *             properties:
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               minDaysInAdvance:
 *                 type: integer
 *                 minimum: 0
 *               ratePercent:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Discount rule inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(discountRuleController.insertDiscountRule),
);

/**
 * @openapi
 * /api/discount-rules/{id}:
 *   patch:
 *     tags: [Discount Rules]
 *     summary: Update a discount rule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The discount rule id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               minDaysInAdvance:
 *                 type: integer
 *                 minimum: 0
 *               ratePercent:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Discount rule updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Discount rule not found
 *   delete:
 *     tags: [Discount Rules]
 *     summary: Delete a discount rule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The discount rule id
 *     responses:
 *       "200":
 *         description: Discount rule deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Discount rule not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(discountRuleController.updateDiscountRule),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(discountRuleController.deleteDiscountRule),
);

export default router;
