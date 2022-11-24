"use strict";
const { check } = require("express-validator");
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
  check("subject").trim().notEmpty().withMessage("Subject is empty"),
  check("message").trim().notEmpty().withMessage("Message is be empty"),
];

exports.signupform = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Invalid Email address"),
  check("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("password").notEmpty().withMessage("Password should not be empty"),
];

exports.projectForms = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email address"),
  check("details").trim().notEmpty().withMessage("Details is required"),
];

exports.resourcesForms = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email address"),
  check("description").trim().notEmpty().withMessage("Description is required"),
  check("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]/)
    .withMessage("Only numbers are allowed"),
  check("domain").trim().notEmpty().withMessage("Reason to join is required"),
];

exports.membershipForms = [
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
  check("collegename")
    .trim()
    .notEmpty()
    .withMessage("College name is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("collegeid").trim().notEmpty().withMessage("College ID is required"),
  check("branch")
    .trim()
    .notEmpty()
    .withMessage("Branch is required")
    .matches(/^[a-zA-Z*$]/)
    .withMessage("Only characters with white space are allowed"),
  check("year")
    .trim()
    .notEmpty()
    .withMessage("Year is required")
    .matches(/^[0-9]/)
    .withMessage("Only numbers are allowed"),
  check("phonenumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]/)
    .withMessage("Only numbers are allowed"),
];
