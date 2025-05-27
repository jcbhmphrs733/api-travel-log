const router = require("express").Router();

const crewController = require("../controllers/crewController");

const { param, validationResult } = require("express-validator");

router.get("/", crewController.getCrew);

router.get(
  "/:id",
  param("id")
    .isHexadecimal()
    .isLength({ min: 24, max: 24 })
    .withMessage("Id must be a 24-char hex string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    crewController.getCrewMember(req, res, next);
  }
);

router.post("/", crewController.postCrewMember);

router.put("/:id",
  param("id")
    .isHexadecimal()
    .isLength({ min: 24, max: 24 })
    .withMessage("Id must be a 24-char hex string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    crewController.updateCrewMember(req, res, next);
  }
);

router.delete("/:id",
  param("id")
    .isHexadecimal()
    .isLength({ min: 24, max: 24 })
    .withMessage("Id must be a 24-char hex string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    crewController.updateCrewMember(req, res, next);
  }
);

router.post("/many", crewController.postMany);

module.exports = router;
