const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

module.exports.createUser = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  const { name, email, friendship } = req.body;
  const password = await bcrypt.hash(req.body.password, 12);

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      let newUser = await User.create({ name, email, friendship, password });
      return res.status(500).json({
        message: "Sign up successfull, user created",
        success: true,
        data: {
          token: jwt.sign(newUser.toJSON(), process.env.jwt_secrete_key, {
            expiresIn: "589200000000000",
          }),
          user: newUser,
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

    if (user) {
      const isMatched = await bcrypt.compare(req.body.password, user.password);
      if (isMatched) {
        const { name, email, id } = user;

        return res.status(200).json({
          message: "Sign in successfully, here is your token",
          success: true,
          data: {
            token: jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "1000000",
            }),
            user: { name, email, id }
          },
        });
      }
      else {
        return res.status(400).json({
          message: "Invalid username or password",
          data: {
            data: req.body,
            user: user,
          },
        });
      }
    } else {
      return res.status(422).json({
        message: "Invalid username or password",
        data: {
          data: req.body,
          user: user,
        },
      });
    }
  } catch (err) {
    console.log("******Error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

module.exports.getUser = async function (req, res) {

  try {
    const id = req.params.id;
    // console.log("Finding user", id);
    const user = await User.findById(id);
    // console.log("Finding user", user);

    return res.status(200).json({
      "success": true,
      "data": {
        "user": user
      }
    });
  } catch (err) {
    console.log("******Error in getUser", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }

}
