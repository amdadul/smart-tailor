import { body, validationResult } from "express-validator";

export const validateCreatePaymentMethods = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
