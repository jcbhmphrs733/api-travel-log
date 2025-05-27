const { body, validationResult } = require("express-validator");

const validateLogEntry = [
  body("date").isISO8601().withMessage("Date must be a valid ISO8601 date"),
  body("time").isString().notEmpty().withMessage("Time is required"),
  body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Latitude must be a valid number between -90 and 90"),
  body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Longitude must be a valid number between -180 and 180"),
  body("temperature").isFloat().withMessage("Temperature must be a number"),
  body("wind_speed").isFloat({ min: 0 }).withMessage("Wind speed must be a non-negative number"),
  body("wind_direction").isString().notEmpty().withMessage("Wind direction is required"),
  body("heading").isString().notEmpty().withMessage("Heading is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateLogEntry;