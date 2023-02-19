"use strict";
const express = require("express");
const router = express.Router();
const {uploadDoc} = require("../configs/multer_config");
const jobDBApis = require("../controllers/jobDBApis");
router.post("/apply", uploadDoc.single("resume"), async (req, res) => {
  try {
    await jobDBApis.addJobApplication(req, res);
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "It's not you. It's on us. We're working on it",
    });
  }
});
module.exports = router;
