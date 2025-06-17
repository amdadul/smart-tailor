import { body, validationResult } from "express-validator";

export const validateCreateSettings = [
  body("deliveryDuration")
    .notEmpty()
    .withMessage("Delivery duration is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
