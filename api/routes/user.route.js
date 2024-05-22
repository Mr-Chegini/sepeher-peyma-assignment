import express from "express";

import validateRequest from "../middlewares/validateRequest.js";
import * as userController from "../controllers/user.controller.js";
import { createUserValidator } from "../validators/createUserValidator.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, email already in use
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router
  .route("")
  .post(createUserValidator, validateRequest, userController.create);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve users with optional filtering and pagination
 *     tags:
 *       - users
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter users by email (partial match)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter users by name (partial match)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: The maximum number of users per page
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         description: The field to sort by (default is createdAt)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The sort order (asc or desc, default is asc)
 *     responses:
 *       200:
 *         description: A list of users and pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       example: "2024-05-22T01:26:29.655Z"
 *                   example:
 *                     - _id: "664d49c578ba0577cea2fcad"
 *                       name: "Babi"
 *                       email: "bbbtasda@gmail.com"
 *                       createdAt: "2024-05-22T01:26:29.655Z"
 *                     - _id: "664d49d47680a74d4003abf0"
 *                       name: "Babi"
 *                       email: "bbbtasdsda@gmail.com"
 *                       createdAt: "2024-05-22T01:26:44.855Z"
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
router.route("").get(userController.find);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       example: "2024-05-21T16:48:49.020Z"
 *                   example:
 *                     _id: "664cd071fe3674f3d1c51956"
 *                     name: "Amir"
 *                     email: "test"
 *                     createdAt: "2024-05-21T16:48:49.020Z"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.route("/:id").get(userController.get);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a specific user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *       - in: body
 *         name: user
 *         description: The user object to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: The updated user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       example: "2024-05-21T16:48:49.020Z"
 *                   example:
 *                     _id: "664cd071fe3674f3d1c51956"
 *                     name: "Amir"
 *                     email: "test"
 *                     createdAt: "2024-05-21T16:48:49.020Z"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router
  .route("/:id")
  .put(createUserValidator, validateRequest, userController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a specific user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.route("/:id").delete(userController.deletedUser);

export default router;
