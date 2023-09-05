"use strict";
const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator");
const resetLinkDbApis = require("../controllers/resetLinkDbApis");

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({extended : false}));

// Request for sending reset password link
router.post("/request",
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
                  await resetLinkDbApis.handleRequests(req, res);
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

// Verify reset password token
router.get("/reset", async (req, res) => {
  try {
    await resetLinkDbApis.verifyResetToken(req, res);
  } catch (err) {
    res.status(500).json({
      success : false,
      message : "Internal server error",
    });
  }
});

// Reset password route
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
                  res.status(400).json(
                      {success : false, errors : validationErr.array()});
                } else {
                  await resetLinkDbApis.updatePassword(req, res);
                }
              } catch (error) {
                res.status(500).json({
                  success : false,
                  message : "Internal server error",
                });
              }
            });

module.exports = router;
