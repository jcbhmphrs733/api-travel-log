const { param, validationResult } = require("express-validator");

const validateObjectId = [
  param("id")
    .isHexadecimal()
    .isLength({ min: 24, max: 24 })
    .withMessage("Id must be a 24-char hex string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateObjectId;