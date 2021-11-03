"use strict";
const { validationResult } = require("express-validator");
const express = require("express");
const user_apis = require("../controllers/user_db_apis");
const passport = require("passport");
const passportConfig = require("../configs/passport_config"); // do not remove this import
const router = express.Router();
const rules = require("../middlewares/validation-rules");
// const csrf = require("csurf");
//----------------------------------------END OF
// IMPORT--------------------------------------------//

//------------------------------------------MIDDLEWARES--------------------------------------------//

// const csrfProtection = csrf({ cookie: true });

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//---------------------------------------END OF
// MIDDLEWARES----------------------------------------//

// to register new users
router.post("/signup", rules.signupform, (req, res) => {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    res.json({ message: "Invalid Data", err: validationErr.array() });
  } else {
    user_apis.register(req, res);
  }
});

//-----------------------------------GOOGLE AUTHENTICATION
// ROUTES--------------------------------//
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
    res.json({ success: false });
  }
});
//-----------------------------------END OF GOOGLE AUTHENTICATION
// ROUTES-------------------------//
//--------------------------------------- GITHUB AUTHENTICATION
// ROUTES---------------------------//

router.get("/github", passport.authenticate("github"));
router.get("/github/redirect/", passport.authenticate("github"), (req, res) => {
  if (req.user) {
    res.redirect(process.env.HOME_PAGE);
  } else {
    res.json({ success: false });
  }
});
//----------------------------------- END OF GITHUB AUTHENTICATION
// ROUTES------------------------//
// to verify emails of new users
router.get("/verify", (req, res) => {
  user_apis.verify_mail(req, res);
});

// to get user corresponding to client session data
router.get("/user", (req, res) => {
  if (!req.user) {
    res.json({ success: false, username: null });
  } else {
    res.json({
      success: true,
      username: req.user.firstname,
      isactive: req.user.isactive,
    });
  }
});
//--------------------------------------EMAIL LOGIN AND LOGOUT
// ROUTES---------------------------------//
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
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

router.get("/logout", (req, res) => {
  req.logout();
  res.session = null;
  res.status(200).json({ logout: true });
});
//------------------------------------END OF EMAIL LOGIN AND LOGOUT
// ROUTES----------------------------------------//
module.exports = router;
