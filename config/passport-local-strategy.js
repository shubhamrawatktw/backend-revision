const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    console.log(error, "error finding user");
  }
});

passport.setAuthenticatedUser = (req,res,next) => {
  if(req.isAuthenticated){
    res.locals.user = res.user
  }
  next()
}

module.exports = passport;
