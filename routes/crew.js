const router = require("express").Router();

const crewController = require("../controllers/crewController");

const validateObjectId = require("../utils/validateObjectId");


router.get("/", crewController.getCrew);

router.get("/:id", validateObjectId, crewController.getCrewMember);

router.post("/", crewController.postCrewMember);

router.put("/:id", validateObjectId, crewController.updateCrewMember);

router.delete("/:id", validateObjectId, crewController.updateCrewMember);

router.post("/many", crewController.postMany);

module.exports = router;
