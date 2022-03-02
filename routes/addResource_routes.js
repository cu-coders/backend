"use strict";
const express = require("express");
const router = express.Router();
const { uploadDoc } = require("../configs/multer_config");
const rules = require("../middlewares/validation-rules");
const resourcesDBApis = require("../controllers/addResourcesDBApis.js");
router.post("/add", rules.resourcesForms, uploadDoc.single("resource"), async (req, res) => {
  try {
    await resourcesDBApis.addResources(req, res);
  } catch (error) {
    res.json({
      err: error.message,
      success: false,
      message: "Resource submission failed",
    });
  }
});
module.exports = router;
