import express from "express";
import { authenticate } from "../../../middlewares/auth.middleware.js";
import {
  businessSignUp,
  createUser,
  getUserList,
  loginUser,
} from "../controllers/users.controller.js";
import {
  validateBusinessSignup,
  validateCreateUser,
  validateLoginUser,
} from "../validations/users.validation.js";

const router = express.Router();

router.post("/business/signup", validateBusinessSignup, businessSignUp);
router.post("/login", validateLoginUser, loginUser);
router.post("/create", authenticate, validateCreateUser, createUser);
router.get("/list", authenticate, getUserList);

export default router;
