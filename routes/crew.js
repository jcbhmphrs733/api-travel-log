const router = require("express").Router();

const crewController = require("../controllers/crewController");

const validateObjectId = require("../utils/validateObjectId");
const validateCrewMember = require("../utils/validateCrewMember");

const { isAuthenticated } = require("../middleware/authenticate");



router.get("/", crewController.getCrew);

router.get("/:id", validateObjectId, crewController.getCrewMember);

router.post("/", isAuthenticated, validateCrewMember, crewController.postCrewMember);

router.put("/:id",isAuthenticated, validateObjectId, validateCrewMember, crewController.updateCrewMember);

router.delete("/:id", isAuthenticated, validateObjectId, crewController.deleteCrewMember);

router.post("/many", crewController.postMany);

module.exports = router;
