"use strict";
const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator");
const resetLinkDbApis = require("../controllers/resetLinkDbApis");
router.post("",
            [
              check("email")
                  .trim()
                  .notEmpty()
                  .withMessage("Please enter the email")
                  .isEmail()
                  .withMessage("Invalid Email format"),
            ],
            async (req, res) => {
              try {
                const validationErr = validationResult(req);
                if (validationErr.isEmpty()) {
                  await resetLinkDbApis.handleRquests(req, res);
                } else {
                  res.json({success : false, err : validationErr.array()});
                }
              } catch (err) {
                res.status(500).json({
                  success : false,
                  message : "It's not you. It's on us. We're working on it",
                });
              }
            });

router.get("/reset", async (req, res) => {
  try {
    await resetLinkDbApis.verifyResetToken(req, res);
  } catch (err) {
    res.status(500).json({
      success : false,
      message : "It's not you. It's on us. We're working on it",
    });
  }
});
router.post("/reset",
            [
              check("email")
                  .trim()
                  .notEmpty()
                  .withMessage("Please enter the email")
                  .isEmail()
                  .withMessage("Invalid Email format"),
            ],
            async (req, res) => {
              try {
                const validationErr = validationResult(req);
                if (!validationErr.isEmpty()) {
                  res.json({success : false, err : validationErr.array()});
                } else {
                  await resetLinkDbApis.updatePassword(req, res);
                }
              } catch (error) {
                res.status(500).json({
                  success : false,
                  message : "It's not you. It's on us. We're working on it",
                });
              }
            });
module.exports = router;
