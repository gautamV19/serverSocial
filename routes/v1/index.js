const express = require("express");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments.js"));
router.use("/likes", require("./likes"));
router.use("/friendship", require("./friendship"));


//** To find a user */

// const passport = require("passport");
// require("../../config/passports")(passport);

// const userController = require("../../controllers/users_controller")

// router.get("/user", passport.authenticate('jwt', { session: false }), userController.getUser)


module.exports = router;
