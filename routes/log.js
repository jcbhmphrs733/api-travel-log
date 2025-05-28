const router = require("express").Router();

const logController = require("../controllers/logController");

const validateObjectId = require("../utils/validateObjectId");
const validateLogEntry = require("../utils/validateLogEntry");

router.get("/", logController.getLog);

router.get("/:id", validateObjectId, logController.getEntry);

router.post("/", validateLogEntry, logController.postEntry);

router.put(
  "/:id",
  validateObjectId,
  validateLogEntry,
  logController.updateEntry
);

router.delete("/:id", validateObjectId, logController.deleteEntry);

// router.post("/many", logController.postMany);

module.exports = router;
