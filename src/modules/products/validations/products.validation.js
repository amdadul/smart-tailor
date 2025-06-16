import { body, validationResult } from "express-validator";

export const validateCreateProducts = [
  body("name").notEmpty().withMessage("Name is required."),
  body("price").notEmpty().withMessage("Price is required."),

  // Validate that 'style' is an array and not empty
  body("styles")
    .isArray({ min: 1 })
    .withMessage("Style must be a non-empty array."),

  // Optional: validate each item in 'style' array (e.g., as a string or object)
  body("styles.*").notEmpty().withMessage("Each style item must not be empty."),

  // Validate that 'measurement' is an array and not empty
  body("measurements")
    .isArray({ min: 1 })
    .withMessage("Measurement must be a non-empty array."),

  // Optional: validate each item in 'measurement' array
  body("measurements.*")
    .notEmpty()
    .withMessage("Each measurement item must not be empty."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
