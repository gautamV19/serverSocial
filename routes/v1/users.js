const express = require("express");

const router = express.Router();

const userController = require("../../controllers/users_controller");

router.post("/login", userController.createSession);
router.post("/signup", userController.createUser);

module.exports = router;
