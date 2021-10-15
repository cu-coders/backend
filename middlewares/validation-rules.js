const { check, sanitizeBody } = require("express-validator");
//--------------------------------END OF
//IMPORTS---------------------------------------//

// validation rules for contact forms
exports.contactForms = [
  check("fullname")
    .trim()
    .notEmpty()
    .withMessage("Fullname is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email address"),
  check("subject")
    .trim().notEmpty()
    .withMessage("Subject is empty"),
  check("message")
    .trim().notEmpty()
    .withMessage("Message is be empty") 
];
