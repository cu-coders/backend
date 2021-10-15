const express = require("express");
const {validationResult} = require("express-validator");
const rules = require("../middlewares/validation-rules");
const contactUsDbApis = require("../controllers/contactUsDbApis");
const router = express.Router();

router.post("/", rules.contactForms, async (req, res) => {
  const validationErr = validationResult(req);
  if (validationErr.isEmpty()) {
    contactUsDbApis.insertMessage(req, res);
  } else {
    res.status(422).jsonp({success : false, err : validationErr.array()});
  }
});
module.exports = router;
