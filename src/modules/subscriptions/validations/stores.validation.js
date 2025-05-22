import { body, validationResult } from "express-validator";

export const validateCreateStore = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required.")
    .isLength({ min: 11 })
    .withMessage("Phone must be at least 11 characters.")
    .matches(/^01/)
    .withMessage("Phone must start with '01'."),

  body("address").trim().notEmpty().withMessage("Address is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
