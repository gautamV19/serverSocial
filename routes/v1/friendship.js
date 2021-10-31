const express = require("express");

const passport = require("passport");
require("../../config/passports")(passport);

const router = express.Router();
///friendship/create_friendship

const friendshipController = require("../../controllers/friendship_controller");

router.post("/create_friendship", passport.authenticate("jwt", { session: false }), friendshipController.addFriend);
router.get("/fetch_user_friends", passport.authenticate("jwt", { session: false }), friendshipController.fetch_user_friends)
router.post("/remove_friendship", passport.authenticate("jwt", { session: false }), friendshipController.removeFriend)


module.exports = router;
