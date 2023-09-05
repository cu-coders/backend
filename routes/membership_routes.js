"use strict";
const express = require("express");
const {validationResult} = require("express-validator");
const rules = require("../middlewares/validation-rules");
const {uploadImage} = require("../configs/multer_config");
const membershipApis = require("../controllers/membershipApis");

const router = express.Router();

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({extended : false}));

router.post("/add", rules.membershipForms, uploadImage.single("image"),
            async (req, res) => {
              try {
                const validationErr = validationResult(req);
                if (validationErr.isEmpty()) {
                  await membershipApis.insertMembership(req, res);
                } else {
                  res.status(400).json(
                      {success : false, errors : validationErr.array()});
                }
              } catch (err) {
                res.status(500).json({
                  success : false,
                  message : "Internal server error",
                });
              }
            });

module.exports = router;
