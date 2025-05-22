import { body, validationResult } from "express-validator";

export const validateCreatePlan = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("description").trim().notEmpty().withMessage("Description is required."),

  body("storeLimit").notEmpty().withMessage("Store Limit is required."),
  body("userLimit").notEmpty().withMessage("User Limit is required."),
  body("monthlyOrderLimit").notEmpty().withMessage("Order Limit is required."),
  body("price").notEmpty().withMessage("Price is required."),
  body("trialDays").notEmpty().withMessage("Trial days is required."),
  body("intervalDays").notEmpty().withMessage("Duration is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
