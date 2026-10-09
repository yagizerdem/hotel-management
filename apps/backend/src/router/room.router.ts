import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as roomController from "@controllers/room.controller.js";

/**
 * @openapi
 * /api/rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: List all rooms ordered by room number
 *     responses:
 *       "200":
 *         description: Rooms fetched successfully
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
 *               - number
 *               - floor
 *               - type
 *               - beds
 *               - hasBalcony
 *               - hasMinibar
 *               - amenities
 *               - cleaningStatus
 *         example:
 *         - number
 *         - floor
 *         - type
 *         - beds
 *         - hasBalcony
 *         - hasMinibar
 *         - amenities
 *         - cleaningStatus
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: number
 *         schema:
 *           type: string
 *         description: Filter by exact room number
 *       - in: query
 *         name: number[ne]
 *         schema:
 *           type: string
 *         description: Filter rooms whose number is not equal to the value
 *       - in: query
 *         name: floor
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 4
 *         description: Filter by exact floor
 *       - in: query
 *         name: floor[eq]
 *         schema:
 *           type: integer
 *         description: Floor equal to the value
 *       - in: query
 *         name: floor[ne]
 *         schema:
 *           type: integer
 *         description: Floor not equal to the value
 *       - in: query
 *         name: floor[gt]
 *         schema:
 *           type: integer
 *         description: Floor greater than the value
 *       - in: query
 *         name: floor[gte]
 *         schema:
 *           type: integer
 *         description: Floor greater than or equal to the value
 *       - in: query
 *         name: floor[lt]
 *         schema:
 *           type: integer
 *         description: Floor less than the value
 *       - in: query
 *         name: floor[lte]
 *         schema:
 *           type: integer
 *         description: Floor less than or equal to the value
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *         description: Filter by room type
 *       - in: query
 *         name: type[ne]
 *         schema:
 *           type: string
 *           enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *         description: Filter rooms whose type is not the value
 *       - in: query
 *         name: hasBalcony[eq]
 *         schema:
 *           type: boolean
 *         description: Filter by balcony availability
 *       - in: query
 *         name: hasMinibar[eq]
 *         schema:
 *           type: boolean
 *         description: Filter by minibar availability
 *       - in: query
 *         name: cleaningStatus
 *         schema:
 *           type: string
 *           enum: [CLEAN, DIRTY, IN_PROGRESS]
 *         description: Filter by cleaning status
 *       - in: query
 *         name: cleaningStatus[ne]
 *         schema:
 *           type: string
 *           enum: [CLEAN, DIRTY, IN_PROGRESS]
 *         description: Filter rooms whose cleaning status is not the value
 */
router.get("/", asyncWrapper(roomController.getRooms));

export default router;
