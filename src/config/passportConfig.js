const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const cookieExtractor = require("../extractors/cookieExtractor");
const User = require("../models/User");

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "M1prIm3RPr0Y3CT0",
};

passport.use(
  "current",
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
