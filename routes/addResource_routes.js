const express = require("express");
const router = express.Router();
const {uploadDoc} = require("../configs/multer_config");
const {validationResult} = require("express-validator");
const resourcesDBApis = require("../controllers/addResourcesDBApis.js");

router.post("/add", rules.resourcesForms, uploadDoc.single("resource"),
            async (req, res) => {
              // Check for validation errors
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res.status(400).json(
                    {success : false, errors : errors.array()});
              }

              try {
                await resourcesDBApis.addResources(req, res);
              } catch (error) {
                res.status(500).json({
                  success : false,
                  message : "Internal server error. We're working on it.",
                });
              }
            });

module.exports = router;
