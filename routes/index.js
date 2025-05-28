const router = require("express").Router();
const baseController = require("../controllers/baseController");

router.use("/", require("./swagger"));
router.get("/", baseController.buildHome);
router.use("/log", require("./log"));
router.use("/crew", require("./crew"));

module.exports = router;
