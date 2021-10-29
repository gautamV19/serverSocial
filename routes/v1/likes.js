//likes/toggle?likeable_id=<post/comment id>&likeable_type=<Post or Comment>

const express = require("express");

const passport = require("passport");
require("../../config/passports")(passport);

const router = express.Router();


const likesController = require("../../controllers/likes_controller");

router.post('/toggle', passport.authenticate('jwt', { session: false }), likesController.toggle);
router.get('/', passport.authenticate('jwt', { session: false }), likesController.list);

module.exports = router;
