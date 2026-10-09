import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as pricingController from "@controllers/pricing.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/pricings:
 *   get:
 *     tags: [Pricings]
 *     summary: List pricings
 *     responses:
 *       "200":
 *         description: Pricings fetched successfully
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
 *               - roomType
 *               - boardType
 *               - startDate
 *               - endDate
 *               - nightlyPrice
 *               - currency
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: roomType
 *         schema:
 *           type: string
 *           enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *         description: Filter by exact roomType
 *       - in: query
 *         name: boardType
 *         schema:
 *           type: string
 *           enum: [FULL_BOARD, ALL_INCLUSIVE]
 *         description: Filter by exact boardType
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact startDate
 *       - in: query
 *         name: startDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startDate greater than the value
 *       - in: query
 *         name: startDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startDate greater than or equal to the value
 *       - in: query
 *         name: startDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startDate less than the value
 *       - in: query
 *         name: startDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: startDate less than or equal to the value
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact endDate
 *       - in: query
 *         name: endDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endDate greater than the value
 *       - in: query
 *         name: endDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endDate greater than or equal to the value
 *       - in: query
 *         name: endDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endDate less than the value
 *       - in: query
 *         name: endDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: endDate less than or equal to the value
 *       - in: query
 *         name: nightlyPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact nightlyPrice
 *       - in: query
 *         name: nightlyPrice[gt]
 *         schema:
 *           type: number
 *         description: nightlyPrice greater than the value
 *       - in: query
 *         name: nightlyPrice[gte]
 *         schema:
 *           type: number
 *         description: nightlyPrice greater than or equal to the value
 *       - in: query
 *         name: nightlyPrice[lt]
 *         schema:
 *           type: number
 *         description: nightlyPrice less than the value
 *       - in: query
 *         name: nightlyPrice[lte]
 *         schema:
 *           type: number
 *         description: nightlyPrice less than or equal to the value
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *           enum: [TRY, USD, EUR, GBP]
 *         description: Filter by exact currency
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(pricingController.getPricings),
);

/**
 * @openapi
 * /api/pricings/insert:
 *   post:
 *     tags: [Pricings]
 *     summary: Insert a new pricing
 *     requestBody:
 *       description: The pricing to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomType
 *               - boardType
 *               - startDate
 *               - endDate
 *               - nightlyPrice
 *             properties:
 *               roomType:
 *                 type: string
 *                 enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               nightlyPrice:
 *                 type: number
 *                 minimum: 0
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *     responses:
 *       "200":
 *         description: Pricing inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(pricingController.insertPricing),
);

/**
 * @openapi
 * /api/pricings/{id}:
 *   patch:
 *     tags: [Pricings]
 *     summary: Update a pricing
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pricing id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomType:
 *                 type: string
 *                 enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               nightlyPrice:
 *                 type: number
 *                 minimum: 0
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *     responses:
 *       "200":
 *         description: Pricing updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Pricing not found
 *   delete:
 *     tags: [Pricings]
 *     summary: Delete a pricing
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pricing id
 *     responses:
 *       "200":
 *         description: Pricing deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Pricing not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(pricingController.updatePricing),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(pricingController.deletePricing),
);

export default router;
