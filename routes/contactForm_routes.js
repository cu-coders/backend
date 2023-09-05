"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const rules = require("../middlewares/validation-rules");
const contactUsDbApis = require("../controllers/contactUsDbApis");
const router = express.Router();

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Contact Form Submission Route
router.post("/", rules.contactForms, async (req, res) => {
  const validationErr = validationResult(req);
  if (validationErr.isEmpty()) {
    try {
      await contactUsDbApis.insertMessage(req, res);
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false, errors: validationErr.array() });
  }
});

module.exports = router;
