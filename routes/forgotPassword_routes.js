const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const resetLinkDbApis = require("../controllers/resetLinkDbApis");
router.post(
  "",
  [
    check("email")
      .trim()
      .notEmpty()
      .withMessage("Please enter the email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid Email format"),
  ],
  async (req, res) => {
    try {
      const validationErr = validationResult(req);
      if (validationErr.isEmpty()) {
        await resetLinkDbApis.handleRquests(req, res);
      } else {
        res.json({ success: false, err: validationErr.array() });
      }
    } catch (err) {
      console.log(err)
      res.json({ success:false,message: "Internal server error" });
    }
  }
);
module.exports = router;
