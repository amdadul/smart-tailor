import { body, validationResult } from "express-validator";

export const validateCreateSubscription = [
  body("planId").notEmpty().withMessage("Plan is required."),
  body("planPrice").notEmpty().withMessage("Plan Price is required."),
  body("paymentMethod").notEmpty().withMessage("Payment Method is required."),
  body("paymentStatus").notEmpty().withMessage("Payment Status is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
