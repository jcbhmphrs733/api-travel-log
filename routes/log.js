const router = require("express").Router();

const logController = require("../controllers/logController");

router.get("/", logController.getLog);
router.get("/:id", logController.getEntry);
router.post("/", logController.postEntry);
router.put("/:id", logController.updateEntry);
router.delete("/:id", logController.deleteEntry);
router.post("/many", logController.postMany);

module.exports = router;