import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as backupLogController from "@controllers/backup-log.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/backup-logs:
 *   get:
 *     tags: [Backup Logs]
 *     summary: List backup logs
 *     responses:
 *       "200":
 *         description: Backup logs fetched successfully
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
 *               - action
 *               - filePath
 *               - sizeBytes
 *               - success
 *               - note
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [BACKUP, RESTORE]
 *         description: Filter by exact action
 *       - in: query
 *         name: filePath
 *         schema:
 *           type: string
 *         description: Filter by exact filePath
 *       - in: query
 *         name: sizeBytes
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Filter by exact sizeBytes
 *       - in: query
 *         name: sizeBytes[gt]
 *         schema:
 *           type: integer
 *         description: sizeBytes greater than the value
 *       - in: query
 *         name: sizeBytes[gte]
 *         schema:
 *           type: integer
 *         description: sizeBytes greater than or equal to the value
 *       - in: query
 *         name: sizeBytes[lt]
 *         schema:
 *           type: integer
 *         description: sizeBytes less than the value
 *       - in: query
 *         name: sizeBytes[lte]
 *         schema:
 *           type: integer
 *         description: sizeBytes less than or equal to the value
 *       - in: query
 *         name: success
 *         schema:
 *           type: boolean
 *         description: Filter by exact success
 *       - in: query
 *         name: note
 *         schema:
 *           type: string
 *         description: Filter by exact note
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(backupLogController.getBackupLogs),
);

/**
 * @openapi
 * /api/backup-logs/insert:
 *   post:
 *     tags: [Backup Logs]
 *     summary: Insert a new backup log
 *     requestBody:
 *       description: The backup log to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - filePath
 *               - success
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [BACKUP, RESTORE]
 *               filePath:
 *                 type: string
 *                 minLength: 1
 *               sizeBytes:
 *                 type: integer
 *                 minimum: 0
 *               success:
 *                 type: boolean
 *               note:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Backup log inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(backupLogController.insertBackupLog),
);

/**
 * @openapi
 * /api/backup-logs/{id}:
 *   patch:
 *     tags: [Backup Logs]
 *     summary: Update a backup log
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The backup log id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [BACKUP, RESTORE]
 *               filePath:
 *                 type: string
 *                 minLength: 1
 *               sizeBytes:
 *                 type: integer
 *                 minimum: 0
 *               success:
 *                 type: boolean
 *               note:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Backup log updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Backup log not found
 *   delete:
 *     tags: [Backup Logs]
 *     summary: Delete a backup log
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The backup log id
 *     responses:
 *       "200":
 *         description: Backup log deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Backup log not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(backupLogController.updateBackupLog),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(backupLogController.deleteBackupLog),
);

export default router;
