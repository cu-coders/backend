const express = require("express");
const { validationResult } = require("express-validator");
const rules = require("../middlewares/validation-rules");
const contactUsDbApis = require("../controllers/contactUsDbApis");
const router = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
router.post("/", csrfProtection, rules.contactForms, async (req, res) => {
  const validationErr = validationResult(req);
  if (validationErr.isEmpty()) {
    contactUsDbApis.insertMessage(req, res);
  } else {
    res.jsonp({ success: false, err: validationErr.array() });
  }
});
module.exports = router;
