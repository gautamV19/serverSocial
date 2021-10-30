const express = require("express");

const passport = require("passport");
require("../../config/passports")(passport);

const router = express.Router();

const userController = require("../../controllers/users_controller");

console.log("inside user");

// router.get("/:id", (req, res) => {
//     console.log("inside user");
//     res.status(200).json({
//         success: true,
//         message: `u r a user ${req.params.id}`
//     });
// })

router.get("/:id", passport.authenticate('jwt', { session: false }), userController.getUser);
router.post("/login", userController.createSession);
router.post("/signup", userController.createUser);

module.exports = router;
