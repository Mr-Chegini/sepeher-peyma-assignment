import express from "express";

import * as userController from "../controllers/userController.js";
import { createUserValidator } from "../validators/createUserValidator.js";
import validateRequest from "../middlewares/validateRequest.js";
const router = express.Router();

router
  .route("")
  .post(createUserValidator, validateRequest, userController.create);
router.route("").get(userController.find);
router.route("/:id").get(userController.get);
router.route("/:id").put(userController.update);
router.route("/:id").delete(userController.deletedUser);

export default router;
