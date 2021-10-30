const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("../models/user");

let opts = {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

module.exports = function (passport) {

    passport.use(
        new JwtStrategy(opts, async function (jwtPayload, done) {
            // console.log("User", jwtPayload);

            User.findById(jwtPayload._id, function (err, user) {
                if (err) {
                    console.log("Error in finding user from JWT", err);
                    return done(err, false);
                }

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    )
}
