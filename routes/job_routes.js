"use strict";
const express = require("express");
const router = express.Router();
const {validationResult} = require("express-validator");
const {uploadDoc} = require("../configs/multer_config");
const jobDBApis = require("../controllers/jobDBApis");

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({extended : false}));

router.post("/apply", uploadDoc.single("resume"), async (req, res) => {
  try {
    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) {
      await jobDBApis.addJobApplication(req, res);
    } else {
      res.status(400).json({success : false, errors : validationErr.array()});
    }
  } catch (err) {
    res.status(500).json({
      success : false,
      message : "Internal server error",
    });
  }
});

module.exports = router;
