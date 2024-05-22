import express from "express";

import userRouter from "./api/routes/user.route.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 * /api/health-check:
 *   get:
 *     summary: Check the health of the server
 *     description: Check if the server is running and healthy.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
router.get("/health-check", (req, res) => res.send("OK"));

router.use("/users", userRouter);

export default router;
