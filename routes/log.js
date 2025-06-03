const router = require("express").Router();

const logController = require("../controllers/logController");

const validateObjectId = require("../utils/validateObjectId");
const validateLogEntry = require("../utils/validateLogEntry");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", logController.getLog);

router.get("/:id", validateObjectId, logController.getEntry);

router.post("/", isAuthenticated, validateLogEntry, logController.postEntry);

router.put("/:id", isAuthenticated, validateObjectId, validateLogEntry, logController.updateEntry);

router.delete("/:id", isAuthenticated, validateObjectId, logController.deleteEntry);

// router.post("/many", logController.postMany);

module.exports = router;
