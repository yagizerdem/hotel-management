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
 */
router.get("/", asyncWrapper(roomController.getRooms));

export default router;
