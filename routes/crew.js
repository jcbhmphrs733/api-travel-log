const router = require("express").Router();

const crewController = require("../controllers/crew");

router.get("/", crewController.getLog);
router.get("/:id", crewController.getEntry);
router.post("/", crewController.postEntry);
router.put("/:id", crewController.updateEntry);
router.delete("/:id", crewController.deleteEntry);
router.post("/many", crewController.postMany);

module.exports = router;