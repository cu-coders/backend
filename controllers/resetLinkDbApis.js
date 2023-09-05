"use strict";
const sanitize = require("mongo-sanitize");
const ResetLink = require("../models/reset_links");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const mailer = require("../controllers/mailer");

async function generateToken(email) {
  const saltRounds = 10; // Increased salt rounds for better security
  const salt = await bcrypt.genSalt(saltRounds);
  const token = await bcrypt.hash(email, salt);
  return token;
}

exports.handleRequests = async (req, res) => {
  try {
    const email = sanitize(req.body.email);
    const user = await User.findOne({ email });

    if (user) {
      const token = await generateToken(email);
      const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set the token expiration to 24 hours
      await ResetLink.findOneAndUpdate(
        { email },
        { $set: { email, token, expireAt } },
        { returnOriginal: false, upsert: true }
      );
      await mailer.sendReset(user.firstname, email, token, req.headers.host);

      return res.json({
        success: true,
        message: "Please visit your email inbox for the reset link.",
      });
    } else {
      return res.json({ success: false, message: "User is not registered." });
    }
  } catch (error) {
    console.error("Error while handling reset request:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const token = sanitize(req.query.token);
    const resetLink = await ResetLink.findOne({ token });

    if (resetLink) {
      return res.render("reset-pass", { token });
    } else {
      return res.render("error", { message: "Invalid request." });
    }
  } catch (error) {
    console.error("Error while verifying reset token:", error);
    return res.render("error", { message: "An error occurred while processing your request." });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);
    const token = sanitize(req.body.token);
    const resetLink = await ResetLink.findOneAndDelete({ email, token });

    if (!resetLink) {
      return res.render("error", { message: "Session link expired." });
    } else {
      const user = await User.findOne({ email });

      if (user) {
        // Update the password and save the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        await user.save();

        return res.render("success");
      } else {
        return res.render("error", { message: "Can't process the request." });
      }
    }
  } catch (error) {
    console.error("Error while updating password:", error);
    return res.render("error", { message: "An error occurred while processing your request." });
  }
};
