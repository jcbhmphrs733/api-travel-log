const { body, validationResult } = require("express-validator");

// Validation middleware for POST /crew
const validateCrewMember = [
  body("first_name").isString().notEmpty().withMessage("First name is required"),
  body("last_name").isString().notEmpty().withMessage("Last name is required"),
  body("rank").isString().notEmpty().withMessage("Rank is required"),
  body("age").isInt({ min: 0 }).withMessage("Age must be a non-negative integer"),
  body("home_country").isString().notEmpty().withMessage("Home country is required"),
  body("time_onboard_months").isInt({ min: 0 }).withMessage("Time onboard must be a non-negative integer"),
  body("hire_date").isISO8601().withMessage("Hire date must be a valid date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateCrewMember;