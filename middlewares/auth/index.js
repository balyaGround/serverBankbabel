const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { user } = require("../../models");

//========================================== for sign in ==========================================
exports.signin = (req, res, next) => {
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    if (err) {
      return next({
        message: [err.message],
        error: "Unauthorized",
        statusCode: 401,
      });
    }
    if (!user) {
      return next({
        message: [info.message],
        error: "Unauthorized",
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const data = await user.findOne({ username: username });

        console.log(data);

        if (!data) {
          return done(null, false, { message: "User is not found!" });
        }
        const validate = await bcrypt.compare(password, data.password);
        if (!validate) {
          return done(null, false, { message: "Wrong password!" });
        }
        return done(null, data, { message: "Login success!" });
      } catch (e) {
        return done(e, false, { message: "User can't be created" });
      }
    }
  )
);

//========================================== permit for user ==========================================
exports.user = (req, res, next) => {
  passport.authorize("user", { session: false }, (err, user, info) => {
    if (err) {
      return next({
        message: err.message,
        error: "Forbidden",
        statusCode: 403,
      });
    }
    if (!user) {
      return next({
        message: info.message,
        error: "Forbidden",
        statusCode: 403,
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
passport.use(
  "user",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },

    async (token, done) => {
      try {
        const data = await user.findOne({ _id: token.user }).select("role");

        if (data.role === "user") {
          return done(null, token);
        }

        return done(null, false, { message: "Access denied!" });
      } catch (error) {
        return done(error, false, { message: "Access denied!" });
      }
    }
  )
);

//========================================== permit for admin ==========================================
exports.admin = (req, res, next) => {
  passport.authorize("admin", { session: false }, (err, user, info) => {
    if (err) {
      return next({
        message: err.message,
        error: "Forbidden",
        statusCode: 403,
      });
    }
    if (!user) {
      return next({
        message: info.message,
        error: "Forbidden",
        statusCode: 403,
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
passport.use(
  "admin",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const data = await user.findOne({ _id: token.user }).select("role");

        if (data.role === "admin") {
          return done(null, token);
        }
        return done(null, false, { message: "Access denied!" });
      } catch (error) {
        return done(error, false, { message: "Access denied!" });
      }
    }
  )
);
