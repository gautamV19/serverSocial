const express = require("express");

const passport = require("passport");
require("../../config/passports")(passport);

const router = express.Router();

const commentsController = require("../../controllers/comments_controller");

router.post('/', passport.authenticate('jwt', { session: false }), commentsController.create);

module.exports = router;
