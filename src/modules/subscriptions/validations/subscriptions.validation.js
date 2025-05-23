import { body, validationResult } from "express-validator";

export const validateCreateSubscription = [
  body("planId").notEmpty().withMessage("Plan is required."),
  body("method").notEmpty().withMessage("Payment Method is required."),
  body("transactionId").notEmpty().withMessage("Transaction Id is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
