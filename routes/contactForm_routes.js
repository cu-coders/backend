const express = require("express");
const { validationResult } = require("express-validator");
const rules = require("../middlewares/validation-rules");
const contactUs_db_apis = require("../controllers/contactUs_db_apis");
const router = express.Router();

router.post("/", rules.contactForms, async(req, res) => {
  const validationErr = validationResult(req);
  if (validationErr.isEmpty()) {
    contactUs_db_apis.insertMessage(req,res)
  } else {
    res.status(422).jsonp({success:false,err:validationErr.array()});
  }
});
module.exports = router;
