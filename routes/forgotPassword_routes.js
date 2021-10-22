const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const resetLinkDbApis = require("../controllers/resetLinkDbApis");
const rules = require("../middlewares/validation-rules");
router.post(
  "",
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
        res.json({ success: false, err: validationErr.array() });
      }
    } catch (err) {
      // console.log(err);
      res.json({ success: false, message: "Internal server error" });
    }
  }
);

router.get("/reset", async (req, res) => {
  try {
    await resetLinkDbApis.verifyResetToken(req, res);
  } catch (err) {
    res.render("error", { message: "Internal server error" });
    // res.json({ success: false, message: "Internal server error" });
  }
});
router.post("/reset", rules.resetForm, async (req, res) => {
  try {
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      res.json({ success: false, err: validationErr.array() });
    } else {
      await resetLinkDbApis.updatePassword(req, res);
    }
  } catch (error) {
    res.render("error", { message: "Internal server error" });
  }
});
module.exports = router;
