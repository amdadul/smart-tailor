import { body, check, validationResult } from "express-validator";

export const validateCreateUser = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required.")
    .isLength({ min: 11 })
    .withMessage("Phone must be at least 11 characters.")
    .matches(/^01/)
    .withMessage("Phone must start with '01'."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required."),

  body("type").notEmpty().withMessage("Type is required."),
  body("storeId").notEmpty().withMessage("Store is required."),
  //.isInt({ min: 0, max: 1 }).withMessage("Type must be 0 or 1."),

  body("profilePicture").optional({ checkFalsy: true }),
  //.isString().withMessage("Profile picture must be a string."),

  // Middleware to handle errors after validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLoginUser = [
  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .matches(/^01[0-9]{9}$/)
    .withMessage("Invalid phone number"),
  check("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBusinessSignup = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("businessName")
    .trim()
    .notEmpty()
    .withMessage("Business Name is required."),

  body("address").trim().notEmpty().withMessage("Address is required."),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required.")
    .isLength({ min: 11 })
    .withMessage("Phone must be at least 11 characters.")
    .matches(/^01/)
    .withMessage("Phone must start with '01'."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required."),

  // Middleware to handle errors after validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
