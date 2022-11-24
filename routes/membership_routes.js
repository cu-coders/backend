"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const rules = require("../middlewares/validation-rules");
const { uploadImage } = require("../configs/multer_config");

const membershipApis = require("../controllers/membershipApis");
const router = express.Router();
// const csrf = require("csurf");
// const csrfProtection = csrf({ cookie: true });
router.post(
  "/add",
  rules.membershipForms,
  uploadImage.single("image"),
  async (req, res) => {
    try {
      await membershipApis.insertMembership(req, res);
    } catch (error) {
      res.json({
        err: error.message,
        success: false,
        message: "Membership activation failed",
      });
    }
  }
);
module.exports = router;
