"use strict";
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const user_apis = require("../controllers/user_db_apis");
const passport = require("passport");
const passportConfig = require("../configs/passport_config"); // Do not remove this import
const rules = require("../middlewares/validation-rules");

// Middlewares
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// User Registration Route
router.post("/signup", rules.signupform, (req, res) => {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    res.status(400).json({ message: "Invalid Data", errors: validationErr.array() });
  } else {
    user_apis.register(req, res);
  }
});

// Google Authentication Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (req.user) {
    res.redirect(process.env.HOME_PAGE);
  } else {
    res.status(401).json({ success: false });
  }
});

// GitHub Authentication Routes
router.get("/github", passport.authenticate("github"));
router.get("/github/redirect/", passport.authenticate("github"), (req, res) => {
  if (req.user) {
    res.redirect(process.env.HOME_PAGE);
  } else {
    res.status(401).json({ success: false });
  }
});

// Email Verification Route
router.get("/verify", (req, res) => {
  user_apis.verify_mail(req, res);
});

// Get User Route
router.get("/user", (req, res) => {
  if (!req.user) {
    res.status(200).json({ success: false, username: null });
  } else {
    res.status(200).json({
      success: true,
      username: req.user.firstname,
      isactive: req.user.isactive,
    });
  }
});

// Email Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        isactive: false,
        message: info.message,
        username: null,
      });
    }
    req.login(user, (error) => {
      if (error) {
        res.status(406).json({ success: false });
      } else {
        res.status(200).json({
          success: true,
          username: user.firstname,
          isactive: user.isactive,
        });
      }
    });
  })(req, res, next);
});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout();
  res.session = null;
  res.status(200).json({ logout: true });
});

module.exports = router;
