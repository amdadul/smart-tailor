import express from "express";
import { authenticate } from "../../../middlewares/auth.middleware.js";
import {
  createPaymentMethods,
  getPaymentMethodList,
} from "../controllers/paymentMethods.controller.js";
import {
  createSettings,
  getSettings,
  updateSettings,
} from "../controllers/settings.controller.js";
import {
  createStatus,
  getStatusList,
  getStatusListByType,
} from "../controllers/status.controller.js";

import { validateCreatePaymentMethods } from "../validations/paymentMethods.validation.js";
import { validateCreateSettings } from "../validations/settings.validation.js";
import { validateCreateStatus } from "../validations/status.validation.js";

const router = express.Router();

router.post(
  "/payment/method/create",
  validateCreatePaymentMethods,
  createPaymentMethods
);
router.get("/payment/method/list", authenticate, getPaymentMethodList);

router.post("/status/create", validateCreateStatus, createStatus);
router.get("/status/list", authenticate, getStatusList);
router.get("/status/listBytype", authenticate, getStatusListByType);

router.post(
  "/settings/create",
  authenticate,
  validateCreateSettings,
  createSettings
);
router.put(
  "/settings/update",
  authenticate,
  validateCreateSettings,
  updateSettings
);
router.get("/settings", authenticate, getSettings);

export default router;
