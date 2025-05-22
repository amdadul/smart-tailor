import express from "express";
import { authenticate } from "../../../middlewares/auth.middleware.js";
import { checkSubscriptionLimit } from "../../../middlewares/subscription.middleware.js";
import { getBusinessList } from "../controllers/business.controller.js";
import { createPlan, getPlanList } from "../controllers/plans.controller.js";
import { createStore, getStoreList } from "../controllers/stores.controller.js";
import {
  getActiveSubscription,
  getLastActiveSubscription,
} from "../controllers/subscriptions.controller.js";
import { validateCreatePlan } from "../validations/plans.validation.js";
import { validateCreateStore } from "../validations/stores.validation.js";

const router = express.Router();

router.post("/plan/create", validateCreatePlan, createPlan);
router.get("/store/list", authenticate, getStoreList);
router.post(
  "/store/create",
  authenticate,
  checkSubscriptionLimit("store"),
  validateCreateStore,
  createStore
);
router.get("/business/list", getBusinessList);
router.get("/plan/list", getPlanList);
router.get("/active", authenticate, getActiveSubscription);
router.get("/last-active", authenticate, getLastActiveSubscription);

export default router;
