const express = require("express");
const passport = require("passport");


const isAuth = require("../../config/authinticate");

const router = express.Router();

const postsController = require("../../controllers/posts_controller");

router.post('/create', isAuth, postsController.create);

module.exports = router;
