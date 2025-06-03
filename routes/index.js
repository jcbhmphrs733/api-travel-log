const router = require("express").Router();
const passport = require("passport");
const baseController = require("../controllers/baseController");

router.use("/", require("./swagger"));
router.get("/", baseController.buildHome);
router.use("/log", require("./log"));
router.use("/crew", require("./crew"));

router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
