import express from "express";

import userRouter from "./api/routes/user.route.js"

const router = express.Router();

router.get("/health-check", (req, res) => res.send("OK"));

router.use("/users", userRouter);


export default router;
