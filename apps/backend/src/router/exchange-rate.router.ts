import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as exchangeRateController from "@controllers/exchange-rate.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/exchange-rates:
 *   get:
 *     tags: [Exchange Rates]
 *     summary: List exchange rates
 *     responses:
 *       "200":
 *         description: Exchange rates fetched successfully
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
 *               - date
 *               - currency
 *               - buyRate
 *               - sellRate
 *               - source
 *         description: Fields to include in the response
 *         default: all fields included if not specified
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
 *         name: currency
 *         schema:
 *           type: string
 *           enum: [TRY, USD, EUR, GBP]
 *         description: Filter by exact currency
 *       - in: query
 *         name: buyRate
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact buyRate
 *       - in: query
 *         name: buyRate[gt]
 *         schema:
 *           type: number
 *         description: buyRate greater than the value
 *       - in: query
 *         name: buyRate[gte]
 *         schema:
 *           type: number
 *         description: buyRate greater than or equal to the value
 *       - in: query
 *         name: buyRate[lt]
 *         schema:
 *           type: number
 *         description: buyRate less than the value
 *       - in: query
 *         name: buyRate[lte]
 *         schema:
 *           type: number
 *         description: buyRate less than or equal to the value
 *       - in: query
 *         name: sellRate
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact sellRate
 *       - in: query
 *         name: sellRate[gt]
 *         schema:
 *           type: number
 *         description: sellRate greater than the value
 *       - in: query
 *         name: sellRate[gte]
 *         schema:
 *           type: number
 *         description: sellRate greater than or equal to the value
 *       - in: query
 *         name: sellRate[lt]
 *         schema:
 *           type: number
 *         description: sellRate less than the value
 *       - in: query
 *         name: sellRate[lte]
 *         schema:
 *           type: number
 *         description: sellRate less than or equal to the value
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: Filter by exact source
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(exchangeRateController.getExchangeRates),
);

/**
 * @openapi
 * /api/exchange-rates/insert:
 *   post:
 *     tags: [Exchange Rates]
 *     summary: Insert a new exchange rate
 *     requestBody:
 *       description: The exchange rate to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - currency
 *               - buyRate
 *               - sellRate
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *               buyRate:
 *                 type: number
 *                 minimum: 0
 *               sellRate:
 *                 type: number
 *                 minimum: 0
 *               source:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       "200":
 *         description: Exchange rate inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(exchangeRateController.insertExchangeRate),
);

/**
 * @openapi
 * /api/exchange-rates/{id}:
 *   patch:
 *     tags: [Exchange Rates]
 *     summary: Update a exchange rate
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange rate id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *               buyRate:
 *                 type: number
 *                 minimum: 0
 *               sellRate:
 *                 type: number
 *                 minimum: 0
 *               source:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       "200":
 *         description: Exchange rate updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Exchange rate not found
 *   delete:
 *     tags: [Exchange Rates]
 *     summary: Delete a exchange rate
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exchange rate id
 *     responses:
 *       "200":
 *         description: Exchange rate deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Exchange rate not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(exchangeRateController.updateExchangeRate),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(exchangeRateController.deleteExchangeRate),
);

export default router;
