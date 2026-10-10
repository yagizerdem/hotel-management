import express from "express";
import { asyncWrapper } from "@/util/async-wrapper.js";
const router = express.Router();
import * as customerController from "@controllers/customer.controller.js";
import {
  authenticationGuard,
  authorizationGuard,
} from "@/middleware/auth-guard.js";
import { UserRole } from "@hotel-management/models";

/**
 * @openapi
 * /api/customers:
 *   get:
 *     tags: [Customers]
 *     summary: List customers
 *     responses:
 *       "200":
 *         description: Customers fetched successfully
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
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - nationality
 *               - tcKimlikNo
 *               - isTcVerified
 *               - passportNo
 *               - phone
 *               - email
 *               - address
 *               - marketingConsent
 *         description: Fields to include in the response
 *         default: all fields included if not specified
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by exact firstName
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by exact lastName
 *       - in: query
 *         name: birthDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by exact birthDate
 *       - in: query
 *         name: birthDate[gt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: birthDate greater than the value
 *       - in: query
 *         name: birthDate[gte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: birthDate greater than or equal to the value
 *       - in: query
 *         name: birthDate[lt]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: birthDate less than the value
 *       - in: query
 *         name: birthDate[lte]
 *         schema:
 *           type: string
 *           format: date-time
 *         description: birthDate less than or equal to the value
 *       - in: query
 *         name: nationality
 *         schema:
 *           type: string
 *         description: Filter by exact nationality
 *       - in: query
 *         name: tcKimlikNo
 *         schema:
 *           type: string
 *           pattern: "^\\d{11}$"
 *         description: Filter by exact tcKimlikNo
 *       - in: query
 *         name: isTcVerified
 *         schema:
 *           type: boolean
 *         description: Filter by exact isTcVerified
 *       - in: query
 *         name: passportNo
 *         schema:
 *           type: string
 *         description: Filter by exact passportNo
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter by exact phone
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter by exact email
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Filter by exact address
 *       - in: query
 *         name: marketingConsent
 *         schema:
 *           type: boolean
 *         description: Filter by exact marketingConsent
 */
router.get(
  "/",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(customerController.getCustomers),
);

/**
 * @openapi
 * /api/customers/insert:
 *   post:
 *     tags: [Customers]
 *     summary: Insert a new customer
 *     requestBody:
 *       description: The customer to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *               nationality:
 *                 type: string
 *                 minLength: 1
 *               tcKimlikNo:
 *                 type: string
 *                 pattern: "^\\d{11}$"
 *                 example: "12345678901"
 *               isTcVerified:
 *                 type: boolean
 *               passportNo:
 *                 type: string
 *                 minLength: 1
 *               phone:
 *                 type: string
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *                 minLength: 1
 *               marketingConsent:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Customer inserted successfully
 *       "400":
 *         description: Invalid request body
 */

router.post(
  "/insert",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(customerController.insertCustomer),
);

/**
 * @openapi
 * /api/customers/{id}:
 *   patch:
 *     tags: [Customers]
 *     summary: Update a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer id
 *     requestBody:
 *       description: Fields to update, at least one is required
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *               nationality:
 *                 type: string
 *                 minLength: 1
 *               tcKimlikNo:
 *                 type: string
 *                 pattern: "^\\d{11}$"
 *                 example: "12345678901"
 *               isTcVerified:
 *                 type: boolean
 *               passportNo:
 *                 type: string
 *                 minLength: 1
 *               phone:
 *                 type: string
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *                 minLength: 1
 *               marketingConsent:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Customer updated successfully
 *       "400":
 *         description: Invalid id or request body
 *       "404":
 *         description: Customer not found
 *   delete:
 *     tags: [Customers]
 *     summary: Delete a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer id
 *     responses:
 *       "200":
 *         description: Customer deleted successfully
 *       "400":
 *         description: Invalid id
 *       "404":
 *         description: Customer not found
 */
router.patch(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(customerController.updateCustomer),
);

router.delete(
  "/:id",
  authenticationGuard,
  authorizationGuard([UserRole.ADMIN, UserRole.MANAGER]),
  asyncWrapper(customerController.deleteCustomer),
);

/**
 * @openapi
 * /api/customers/create-profile:
 *   post:
 *     tags: [Customers]
 *     summary: Create a customer profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *               nationality:
 *                 type: string
 *                 minLength: 1
 *               tcKimlikNo:
 *                 type: string
 *                 pattern: "^\\d{11}$"
 *                 example: "12345678901"
 *               passportNo:
 *                 type: string
 *                 minLength: 1
 *               phone:
 *                 type: string
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *                 minLength: 1
 *               marketingConsent:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Customer inserted successfully
 *       "400":
 *         description: Invalid request body
 *       "409":
 *         description: A customer with this TC Kimlik No already exists
 */
router.post(
  "/create-profile",
  authenticationGuard,
  authorizationGuard([UserRole.CUSTOMER]),
  asyncWrapper(customerController.createProfile),
);

export default router;
