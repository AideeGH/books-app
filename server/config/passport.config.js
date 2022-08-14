const passport = require("passport");
const { Strategy } = require("passport-jwt");
const query = require("./database.config");

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
}

const jwtOptions = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  "jwt",
  new Strategy(jwtOptions, async (payload, done) => {
    try {
      const [user] = await query("SELECT * FROM users WHERE users.id = ?", [
        payload.id,
      ]);

      if (!user) {
        return done(null, false, "Invalid credentials");
      }
      return done(null, user);
    } catch (err) {
      return done(true, false, "Something went wrong");
    }
  })
);

module.exports = passport;
