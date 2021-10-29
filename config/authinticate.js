const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { verifyJWT, errorResponse } = require("../Helpers/functions")

const isAuth = async (req, res, next) => {
    try {
        console.log("inside isAuth");
        const authHeader = req.headers("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        console.log(token);

        if (!token)
            return res.status(401).json(errorResponse("user not authenticated", 401));

        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(401).json(errorResponse("user not authenticated", 401));

            req.user = user;
            next();
        }
        );

    } catch (err) {
        return res.status(401).json(errorResponse("user not authenticated", 401));
    }
};

module.exports = isAuth;