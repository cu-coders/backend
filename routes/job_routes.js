"use strict";
const express = require("express");
const router = express.Router();
const { uploadDoc } = require("../configs/multer_config");
const jobDBApis = require("../controllers/jobDBApis");
router.post("/apply", uploadDoc.single("resume"), async (req, res) => {
  const validationErr = validationResult(req);
  if (validationErr.isEmpty()) {
    await jobDBApis.addJobApplication(req, res);
  } else {
    res.status(500).json({ success: false, err: validationErr.array() });
  }
});
module.exports = router;
