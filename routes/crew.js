const router = require("express").Router();

const crewController = require("../controllers/crewController");

const validateObjectId = require("../utils/validateObjectId");
const validateCrewMember = require("../utils/validateCrewMember");

router.get("/", crewController.getCrew);

router.get("/:id", validateObjectId, crewController.getCrewMember);

router.post("/", validateCrewMember, crewController.postCrewMember);

router.put(
  "/:id",
  validateObjectId,
  validateCrewMember,
  crewController.updateCrewMember
);

router.delete("/:id", validateObjectId, crewController.deleteCrewMember);

// router.post("/many", crewController.postMany);

module.exports = router;
