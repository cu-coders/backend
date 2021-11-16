"use strict";
const express = require("express");
const router = express.Router();
const { uploadDoc } = require("../configs/multer_config");
const { addJobApplication } = require("../controllers/jobDBApis");
router.post("/apply", uploadDoc.single("resume"), (req, res) => {
  try {
    addJobApplication(req, res);
  } catch (error) {
    res.json({
      error: error.message,
      success: false,
      message: "Form submission failed",
    });
  } finally {
    return;
  }
});
module.exports = router;
