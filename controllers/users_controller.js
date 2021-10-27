const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.createUser = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      return res.status(500).json({
        message: "Sign up successfull, user created",
        success: true,
        data: {
          token: "",
          user: {}
        }

      });
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    if (err) {
      console.log("error in signing up a user", err);
      return;
    }
  }
};

// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
        data: {
          data: req.body,
          user: user,
        },
      });
    }

    return res.json(200, {
      message: "Sign in successfully, here is your token",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secrete_key, {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log("******Error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
