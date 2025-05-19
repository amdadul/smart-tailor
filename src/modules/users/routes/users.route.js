import express from "express";
import { authenticate } from "../../../middlewares/auth.middleware.js";
import { createUser, loginUser } from "../controllers/users.controller.js";
import {
  validateCreateUser,
  validateLoginUser,
} from "../validations/users.validation.js";

const router = express.Router();

router.post("/create", validateCreateUser, createUser);
router.post("/login", validateLoginUser, loginUser);
router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

export default router;
