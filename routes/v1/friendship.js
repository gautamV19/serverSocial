const express = require("express");

const passport = require("passport");
require("../../config/passports")(passport);

const router = express.Router();
///friendship/create_friendship

const friendshipController = require("../../controllers/friendship_controller");

router.post("/creat_friendship", passport.authenticate("jwt", { session: false }), friendshipController.addFriend);


module.exports = router;
