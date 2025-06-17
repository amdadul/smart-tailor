import { body, validationResult } from "express-validator";

export const validateCreateStatus = [
  body("type").notEmpty().withMessage("Type is required."),
  body("name").notEmpty().withMessage("Name is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
