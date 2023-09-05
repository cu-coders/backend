"use strict";
const passport = require("passport");
const sanitize = require("mongo-sanitize");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/users");

// Define passport strategies
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = sanitize(profile.emails[0].value);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return done(null, existingUser._id);
        } else {
          const firstname = sanitize(profile.name.givenName);
          const lastname = sanitize(profile.name.familyName);
          const third_partyID = sanitize(profile.id);
          const newUser = new User({
            firstname,
            lastname,
            email,
            third_partyID,
            auth_type: "google",
            password: null,
            mailtoken: null,
            isactive: true,
          });
          await newUser.save();
          return done(null, newUser._id);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = sanitize(profile.emails[0].value);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return done(null, existingUser._id);
        } else {
          const firstname = sanitize(profile.displayName);
          const third_partyID = sanitize(profile.id);
          const newUser = new User({
            firstname,
            lastname: null,
            email,
            third_partyID,
            auth_type: "github",
            password: null,
            mailtoken: null,
            isactive: true,
          });
          await newUser.save();
          return done(null, newUser._id);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: true },
    async (email, password, done) => {
      try {
        const sEmail = sanitize(email);
        const user = await User.findOne({ email: sEmail });

        if (!user) {
          return done(null, false, { message: "Unregistered email" });
        }

        if (!user.password) {
          return done(null, false, { message: "Invalid login mode" });
        }

        const sPassword = sanitize(password);
        const isValid = await bcrypt.compare(sPassword, user.password);

        if (isValid) {
          if (user.isactive) {
            return done(null, user._id);
          } else {
            return done(null, false, { message: "Please verify your email first" });
          }
        } else {
          return done(null, false, { message: "Invalid credentials" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Define serializers and deserializers
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      done(null, user);
    }
  });
});

module.exports = passport;
