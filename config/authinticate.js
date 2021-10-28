const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { verifyJWT, errorResponse } = require("../Helpers/functions")

const isAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log("token: ", req.header("Authorization"));
        console.log("hi");
        // if (!token)
        // return res.status(401).json(errorResponse("user not authenticated", 401));
        console.log("user");
        const verifiedUser = verifyJWT(token);
        console.log("user", verifiedUser);
        req.user = verifiedUser;
        next();
    } catch (err) {
        return res.status(401).json(errorResponse("user not authenticated", 401));
    }
};

module.exports = isAuth;