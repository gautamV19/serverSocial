const express = require("express");

const passport = require("passport");
require("../../config/passports")(passport);

const router = express.Router();

const userController = require("../../controllers/users_controller");

router.get("/:id", passport.authenticate('jwt', { session: false }), userController.getUser);
router.post("/login", userController.createSession);
router.post("/signup", userController.createUser);
router.post("/edit", userController.editUser)

module.exports = router;
