import express from "express";

import validateRequest from "../middlewares/validateRequest.js";
import * as userController from "../controllers/userController.js";
import { createUserValidator } from "../validators/createUserValidator.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided email, password, and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *     responses:
 *       '200':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was added successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '409':
 *         description: Conflict. User with the same email already exists.
 */
router
  .route("")
  .post(createUserValidator, validateRequest, userController.create);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users with pagination and sorting.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of users to return per page (default is 10).
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         description: The field to sort users by (default is createdAt).
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: integer
 *         description: The sort order (1 for ascending, -1 for descending, default is 1).
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *       '500':
 *         description: Internal server error.
 */
router.route("").get(userController.find);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     description: Retrieve the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: The user with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Server Error.
 */

router.route("/:id").get(userController.get);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a specific user by ID
 *     description: Update the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *       - in: body
 *         name: user
 *         required: true
 *         description: The updated user object.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: The email address of the user.
 *             password:
 *               type: string
 *               description: The password of the user.
 *             name:
 *               type: string
 *               description: The name of the user.
 *     responses:
 *       '200':
 *         description: The updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Server Error.
 */
router
  .route("/:id")
  .put(createUserValidator, validateRequest, userController.update);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a specific user by ID
 *     description: Delete the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was deleted successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Server Error.
 */
router.route("/:id").delete(userController.deletedUser);

export default router;
