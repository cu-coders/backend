"use strict";
const express = require("express");
const {validationResult} = require("express-validator");
const rules = require("../middlewares/validation-rules");
const {uploadImage} = require("../configs/multer_config");

const membershipApis = require("../controllers/membershipApis");
const router = express.Router();
// const csrf = require("csurf");
// const csrfProtection = csrf({ cookie: true });
router.post("/add", rules.membershipForms, uploadImage.single("image"),
            async (req, res) => {
              try {
                await membershipApis.insertMembership(req, res);
              } catch (error) {
                res.status(500).json({
                  success : false,
                  message : "It's not you. It's on us. We're working on it",
                });
              }
            });
module.exports = router;
