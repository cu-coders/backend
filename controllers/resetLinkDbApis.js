"use strict";
const sanitize = require("mongo-sanitize");
const ResetLink = require("../models/reset_links");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const mailer = require("../controllers/mailer");

async function generateToken(email) {
  const salt = await bcrypt.genSalt(5);
  let token = await bcrypt.hash(email, salt);
  token = token.substring(7);
  return token;
}
exports.handleRquests = async (req, res) => {
  const email = sanitize(req.body.email);
  const user = await User.findOne({ email });
  if (user) {
    // handel the req
    const token = await generateToken(email);
    await ResetLink.findOneAndUpdate(
      { email },
      { $set: { email, token, expite_at: Date.now() } },
      { returnOriginal: false, upsert: true }
    );
    await mailer.sendReset(user.firstname, email, token, req.headers.host);
    res.json({
      success: true,
      message: "Please visit your e-mail inbox for reset link",
    });
  } else {
    res.json({ success: false, message: "User is not registered" });
  }
};

exports.verifyResetToken = async (req, res) => {
  const token = sanitize(req.query.token);
  const reset_link = await ResetLink.findOne({ token });
  if (reset_link) {
    res.render("reset-pass", { token });
  } else {
    res.render("error", { message: "Invalid request" });
  }
};

exports.updatePassword = async (req, res) => {
  const email = sanitize(req.body.email);
  const password = sanitize(req.body.password);
  const token = sanitize(req.body.token);
  const reset_link = await ResetLink.findOneAndDelete({
    $and: [{ email, token }],
  });
  if (!reset_link) {
    res.render("error", { message: "Session Link expired" });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      // For successful update
      user.password = password;
      await user.save();
      res.render("success");
    } else {
      // Did not update
      res.render("error", { message: "Can't process the request" });
    }
  }
};
