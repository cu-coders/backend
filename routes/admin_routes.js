"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cloudinaryConfig = require("../configs/cloudinary_config").v2;
const { uploadImage, uploadDoc } = require("../configs/multer_config");
const auth_admin = require("../controllers/auth_admin");
const db_apis = require("../controllers/event_db_apis");
const teamDBApis = require("../controllers/teamDBApis");
const resourcesDBApis = require("../controllers/resources_db_apis");

// Middleware to verify authentication
function verifyAdminAuth(req, res, next) {
  if (!req.cookies.auth) {
    return res.redirect("./login");
  }

  jwt.verify(req.cookies.auth, process.env.SECRET, (err, decoded) => {
    if (err || decoded !== process.env.ADMIN_NAME) {
      return res.redirect("./login");
    }
    next();
  });
}

// Sends form to add event
router.get("/add-events", verifyAdminAuth, (req, res) => {
  res.render("./add-events");
});

// Saves form to the database
router.post(
  "/add-events",
  verifyAdminAuth,
  uploadImage.single("cover"),
  async (req, res) => {
    try {
      const result = await cloudinaryConfig.uploader.upload(req.file.path, {
        folder: "event covers",
        use_filename: true,
      });
      const { secure_url, public_id } = result;
      await db_apis.insert_event(req, secure_url, public_id);
      res.render("./add-events", { message: "Event added" });
    } catch (error) {
      res.status(403).send(error.message);
    }
  },
);

// Render the team submission form
router.get("/add-team", verifyAdminAuth, (req, res) => {
  res.render("add-team");
});

// Render the resources submission form
router.get("/add-resources", verifyAdminAuth, (req, res) => {
  res.render("add-resources");
});

// Handle team submit form request
router.post(
  "/add-team",
  verifyAdminAuth,
  uploadImage.single("profileImage"),
  async (req, res) => {
    try {
      const result = await cloudinaryConfig.uploader.upload(req.file.path, {
        folder: "profile-images",
        use_filename: true,
      });
      const { secure_url, public_id } = result;
      await teamDBApis.addTeam(req, res, secure_url, public_id);
    } catch (error) {
      res.render("error", { message: "Profile can't be added" });
    }
  },
);

// Handle resources submit form request
router.post(
  "/add-resources",
  verifyAdminAuth,
  uploadDoc.single("resources"),
  uploadImage.single("imageSrc"),
  async (req, res) => {
    try {
      const result = await cloudinaryConfig.uploader.upload(req.file.path, {
        folder: "resources",
        use_filename: true,
      });
      const { secure_url, public_id } = result;
      await resourcesDBApis.insert_resource(req, res, secure_url, public_id);
    } catch (error) {
      res.render("error", { message: "Resources can't be added" });
    }
  },
);

// Sends admin login form
router.get("/login", (req, res) => {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, process.env.SECRET, (err, decoded) => {
      if (!err && decoded === process.env.ADMIN_NAME) {
        return res.redirect("./add-events");
      }
    });
  }
  res.render("login");
});

router.post("/login", (req, res) => {
  auth_admin.auth(req, res);
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("./login");
});

module.exports = router;
