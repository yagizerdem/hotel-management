import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as roomBlockController from "@controllers/room-block.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/room-blocks:
 *   get:
 *     tags: [Room Blocks]
 *     summary: List room blocks
 *     responses:
 *       "200":
 *         description: Room blocks fetched successfully
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
 *               - room
 *               - startDate
 *               - endDate
 *               - reason
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: room
 *         schema:
 *           type: string
 *         description: Filter by exact room
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
 *         name: reason
 *         schema:
 *           type: string
 *         description: Filter by exact reason
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomBlockController.getRoomBlocks),
);

/**
 * @openapi
 * /api/room-blocks/insert:
 *   post:
 *     tags: [Room Blocks]
 *     summary: Insert a new room block
 *     requestBody:
 *       description: The room block to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room
 *               - startDate
 *               - endDate
 *               - reason
 *             properties:
 *               room:
 *                 type: string
 *                 description: Room id
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       "200":
 *         description: Room block inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomBlockController.insertRoomBlock),
);

/**
 * @openapi
 * /api/room-blocks/{id}:
 *   patch:
 *     tags: [Room Blocks]
 *     summary: Update a room block
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room block id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *                 description: Room id
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       "200":
 *         description: Room block updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Room block not found
 *   delete:
 *     tags: [Room Blocks]
 *     summary: Delete a room block
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room block id
 *     responses:
 *       "200":
 *         description: Room block deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Room block not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomBlockController.updateRoomBlock),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(roomBlockController.deleteRoomBlock),
);

export default router;
