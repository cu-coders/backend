"use strict";
const sanitize = require("mongo-sanitize");
const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const email = sanitize(req.body.email);
    const firstname = sanitize(req.body.firstname);
    const lastname = sanitize(req.body.lastname);
    const password = sanitize(req.body.password);

    // Validate the input data (e.g., check if required fields are provided)
    if (!email || !firstname || !lastname || !password) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Generate a salt and hash the user's password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the provided data
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      mailtoken: null,
      isactive: false,
      auth_type: "email",
      third_partyID: null,
    });

    // Send the verification email to the user's email address
    const isEmailSent = await user.send_verification(req);

    if (isEmailSent) {
      await user.save();
      return res.status(200).json({ success: true, message: "Registered, please check your email for verification." });
    } else {
      return res.status(500).json({ success: false, message: "Failed to send the verification email." });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const mailtoken = sanitize(req.query.token);
    const user = await User.findOne({ mailtoken });

    if (user && mailtoken) {
      user.mailtoken = null;
      user.isactive = true;
      await user.save();
      return res.status(200).json({ success: true, message: "Email verified successfully." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid or expired verification token." });
    }
  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
