import express from "express";
import { authenticate } from "../../../middlewares/auth.middleware.js";
import {
  createMeasurementCategory,
  getMeasurementCategoryByType,
  getMeasurementCategoryList,
} from "../controllers/measurementCategories.controller.js";
import {
  createStyleCategory,
  getStyleCategoryList,
} from "../controllers/styleCategories.controller.js";
import {
  createStyleOptions,
  getStyleOptions,
} from "../controllers/styleOptions.controller.js";
import { validateCreateMeasurementCategory } from "../validations/measurementCategories.validation.js";
import { validateCreateStyleCategory } from "../validations/styleCategories.validation.js";
import { validateCreateStyleOptions } from "../validations/styleOptions.validation.js";

const router = express.Router();

router.post(
  "/style/category/create",
  authenticate,
  validateCreateStyleCategory,
  createStyleCategory
);
router.get("/style/category/list", authenticate, getStyleCategoryList);

router.post(
  "/style/options/create",
  authenticate,
  validateCreateStyleOptions,
  createStyleOptions
);
router.get("/style/options", authenticate, getStyleOptions);

router.post(
  "/measurement/category/create",
  authenticate,
  validateCreateMeasurementCategory,
  createMeasurementCategory
);
router.get(
  "/measurement/category/list",
  authenticate,
  getMeasurementCategoryList
);

router.get(
  "/measurement/category/listByType",
  authenticate,
  getMeasurementCategoryByType
);

export default router;
