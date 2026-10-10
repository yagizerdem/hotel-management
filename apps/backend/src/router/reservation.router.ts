import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as reservationController from "@controllers/reservation.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: List reservations
 *     responses:
 *       "200":
 *         description: Reservations fetched successfully
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
 *               - customer
 *               - room
 *               - guests
 *               - checkInDate
 *               - checkOutDate
 *               - boardType
 *               - source
 *               - status
 *               - currency
 *               - nights
 *               - nightlyPrice
 *               - discountPercent
 *               - totalPrice
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *         description: Filter by exact customer
 *       - in: query
 *         name: room
 *         schema:
 *           type: string
 *         description: Filter by exact room
 *       - in: query
 *         name: checkInDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact checkInDate
 *       - in: query
 *         name: checkInDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkInDate greater than the value
 *       - in: query
 *         name: checkInDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkInDate greater than or equal to the value
 *       - in: query
 *         name: checkInDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkInDate less than the value
 *       - in: query
 *         name: checkInDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkInDate less than or equal to the value
 *       - in: query
 *         name: checkOutDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact checkOutDate
 *       - in: query
 *         name: checkOutDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkOutDate greater than the value
 *       - in: query
 *         name: checkOutDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkOutDate greater than or equal to the value
 *       - in: query
 *         name: checkOutDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkOutDate less than the value
 *       - in: query
 *         name: checkOutDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: checkOutDate less than or equal to the value
 *       - in: query
 *         name: boardType
 *         schema:
 *           type: string
 *           enum: [FULL_BOARD, ALL_INCLUSIVE]
 *         description: Filter by exact boardType
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           enum: [WEB, RECEPTION]
 *         description: Filter by exact source
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW]
 *         description: Filter by exact status
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *           enum: [TRY, USD, EUR, GBP]
 *         description: Filter by exact currency
 *       - in: query
 *         name: nights
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Filter by exact nights
 *       - in: query
 *         name: nights[gt]
 *         schema:
 *           type: integer
 *         description: nights greater than the value
 *       - in: query
 *         name: nights[gte]
 *         schema:
 *           type: integer
 *         description: nights greater than or equal to the value
 *       - in: query
 *         name: nights[lt]
 *         schema:
 *           type: integer
 *         description: nights less than the value
 *       - in: query
 *         name: nights[lte]
 *         schema:
 *           type: integer
 *         description: nights less than or equal to the value
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
 *         name: discountPercent
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         description: Filter by exact discountPercent
 *       - in: query
 *         name: discountPercent[gt]
 *         schema:
 *           type: number
 *         description: discountPercent greater than the value
 *       - in: query
 *         name: discountPercent[gte]
 *         schema:
 *           type: number
 *         description: discountPercent greater than or equal to the value
 *       - in: query
 *         name: discountPercent[lt]
 *         schema:
 *           type: number
 *         description: discountPercent less than the value
 *       - in: query
 *         name: discountPercent[lte]
 *         schema:
 *           type: number
 *         description: discountPercent less than or equal to the value
 *       - in: query
 *         name: totalPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Filter by exact totalPrice
 *       - in: query
 *         name: totalPrice[gt]
 *         schema:
 *           type: number
 *         description: totalPrice greater than the value
 *       - in: query
 *         name: totalPrice[gte]
 *         schema:
 *           type: number
 *         description: totalPrice greater than or equal to the value
 *       - in: query
 *         name: totalPrice[lt]
 *         schema:
 *           type: number
 *         description: totalPrice less than the value
 *       - in: query
 *         name: totalPrice[lte]
 *         schema:
 *           type: number
 *         description: totalPrice less than or equal to the value
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(reservationController.getReservations),
);

/**
 * @openapi
 * /api/reservations/insert:
 *   post:
 *     tags: [Reservations]
 *     summary: Insert a new reservation
 *     requestBody:
 *       description: The reservation to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - room
 *               - checkInDate
 *               - checkOutDate
 *               - boardType
 *               - source
 *               - nights
 *               - nightlyPrice
 *               - totalPrice
 *             properties:
 *               customer:
 *                 type: string
 *                 description: Customer id
 *               room:
 *                 type: string
 *                 description: Room id
 *               guests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [firstName, lastName]
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     birthDate:
 *                       type: string
 *                       format: date-time
 *                     nationality:
 *                       type: string
 *                     tcKimlikNo:
 *                       type: string
 *                       pattern: "^\\d{11}$"
 *                     passportNo:
 *                       type: string
 *               checkInDate:
 *                 type: string
 *                 format: date-time
 *               checkOutDate:
 *                 type: string
 *                 format: date-time
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               source:
 *                 type: string
 *                 enum: [WEB, RECEPTION]
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW]
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *               nights:
 *                 type: integer
 *                 minimum: 1
 *               nightlyPrice:
 *                 type: number
 *                 minimum: 0
 *               discountPercent:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               totalPrice:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       "200":
 *         description: Reservation inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(reservationController.insertReservation),
);

/**
 * @openapi
 * /api/reservations/{id}:
 *   patch:
 *     tags: [Reservations]
 *     summary: Update a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: Customer id
 *               room:
 *                 type: string
 *                 description: Room id
 *               guests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [firstName, lastName]
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     birthDate:
 *                       type: string
 *                       format: date-time
 *                     nationality:
 *                       type: string
 *                     tcKimlikNo:
 *                       type: string
 *                       pattern: "^\\d{11}$"
 *                     passportNo:
 *                       type: string
 *               checkInDate:
 *                 type: string
 *                 format: date-time
 *               checkOutDate:
 *                 type: string
 *                 format: date-time
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               source:
 *                 type: string
 *                 enum: [WEB, RECEPTION]
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW]
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *               nights:
 *                 type: integer
 *                 minimum: 1
 *               nightlyPrice:
 *                 type: number
 *                 minimum: 0
 *               discountPercent:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               totalPrice:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       "200":
 *         description: Reservation updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Reservation not found
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation id
 *     responses:
 *       "200":
 *         description: Reservation deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Reservation not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(reservationController.updateReservation),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(reservationController.deleteReservation),
);

/**
 * @openapi
 * /api/reservations/create-web:
 *   post:
 *     tags: [Reservations]
 *     summary: Create a reservation from the web as the authenticated customer
 *     description: >
 *       Creates a PENDING reservation for the authenticated customer user.
 *       The user must be active and have a customer profile. The number of
 *       nights is calculated from the dates; prices are set to 0 for now.
 *       The reservation source and creator are taken from the session, not
 *       from the request body.
 *     requestBody:
 *       description: The reservation to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room
 *               - checkInDate
 *               - checkOutDate
 *               - boardType
 *             properties:
 *               room:
 *                 type: string
 *                 pattern: "^[a-f\\d]{24}$"
 *                 description: Room id
 *               checkInDate:
 *                 type: string
 *                 format: date-time
 *               checkOutDate:
 *                 type: string
 *                 format: date-time
 *                 description: Must be after checkInDate
 *               boardType:
 *                 type: string
 *                 enum: [FULL_BOARD, ALL_INCLUSIVE]
 *               currency:
 *                 type: string
 *                 enum: [TRY, USD, EUR, GBP]
 *                 default: USD
 *     responses:
 *       "200":
 *         description: Reservation created successfully
 *       "400":
 *         description: >
 *           Invalid request body or dates, the user has no customer profile,
 *           or the room is blocked for the chosen dates
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: The user is inactive or is not a customer
 *       "500":
 *         description: Reservation could not be created
 */
router.post(
  "/create-web",
  authenticationGuard,
  authorizationGuard([UserRole.CUSTOMER]),
  asyncWrapper(reservationController.createReservationWeb),
);

export default router;
