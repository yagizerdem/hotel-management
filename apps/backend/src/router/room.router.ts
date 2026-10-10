import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as roomController from "@controllers/room.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

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

router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER, UserRole.RECEPTIONIST]),
  asyncWrapper(roomController.getRooms),
);

/**
 * @openapi
 * /api/rooms/insert:
 *   post:
 *     tags: [Rooms]
 *     summary: Insert a new room
 *     requestBody:
 *       description: The room to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - floor
 *               - type
 *               - beds
 *             properties:
 *               number:
 *                 type: string
 *                 minLength: 1
 *                 example: "101"
 *               floor:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 4
 *                 example: 1
 *               type:
 *                 type: string
 *                 enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *                 example: SINGLE
 *               beds:
 *                 type: object
 *                 description: Bed counts, at least one bed is required
 *                 required:
 *                   - single
 *                   - double
 *                 properties:
 *                   single:
 *                     type: integer
 *                     minimum: 0
 *                     example: 1
 *                   double:
 *                     type: integer
 *                     minimum: 0
 *                     example: 0
 *               hasBalcony:
 *                 type: boolean
 *                 default: false
 *               hasMinibar:
 *                 type: boolean
 *                 default: true
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default: [AC, TV, HAIR_DRYER, WIFI]
 *               cleaningStatus:
 *                 type: string
 *                 enum: [CLEAN, DIRTY, IN_PROGRESS]
 *                 default: CLEAN
 *     responses:
 *       "200":
 *         description: Room inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomController.insertRoom),
);

/**
 * @openapi
 * /api/rooms/{id}:
 *   patch:
 *     tags: [Rooms]
 *     summary: Update a room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 minLength: 1
 *               floor:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 4
 *               type:
 *                 type: string
 *                 enum: [SINGLE, TWIN, DOUBLE, TRIPLE_SINGLES, TRIPLE_MIXED, QUAD, ROYAL_SUITE]
 *               beds:
 *                 type: object
 *                 required: [single, double]
 *                 properties:
 *                   single:
 *                     type: integer
 *                     minimum: 0
 *                   double:
 *                     type: integer
 *                     minimum: 0
 *               hasBalcony:
 *                 type: boolean
 *               hasMinibar:
 *                 type: boolean
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               cleaningStatus:
 *                 type: string
 *                 enum: [CLEAN, DIRTY, IN_PROGRESS]
 *     responses:
 *       "200":
 *         description: Room updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Room not found
 *   delete:
 *     tags: [Rooms]
 *     summary: Delete a room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room id
 *     responses:
 *       "200":
 *         description: Room deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Room not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomController.updateRoom),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomController.deleteRoom),
);

/**
 * @openapi
 * /api/rooms/available:
 *   get:
 *     tags: [Rooms]
 *     summary: Get available rooms
 *     parameters:
 *       - in: query
 *         name: checkInDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The check-in date
 *       - in: query
 *         name: checkOutDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The check-out date
 *     responses:
 *       "200":
 *         description: Available rooms fetched successfully
 *       "400":
 *         description: Invalid query parameters
 */

router.get(
  "/available",
  authenticationGuard,
  asyncWrapper(roomController.getAvailableRooms),
);

/**
 * /api/rooms/all-rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: Get all rooms
 *     responses:
 *       "200":
 *         description: All rooms fetched successfully
 *       "400":
 *         description: Invalid request
 *
 */

export default router;
