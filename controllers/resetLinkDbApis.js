"use strict";
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
  const {email} = req.body;
  // console.log(email);

  const user = await User.findOne({email : email});
  if (user) {
    // handel the req
    const token = await generateToken(email);
    await ResetLink.findOneAndUpdate(
        {email}, {$set : {email, token, expite_at : Date.now()}},
        {returnOriginal : false, upsert : true});
    await mailer.sendReset(user.firstname, email, token, req.headers.host);
    res.json({
      success : true,
      message : "Please visit your e-mail inbox for reset link",
    });
  } else {
    res.json({success : false, message : "User is not registered"});
  }
};

exports.verifyResetToken = async (req, res) => {
  const {token} = req.query;
  const reset_link = await ResetLink.findOne({token});
  if (reset_link) {
    res.render("reset-pass", {token});
  } else {
    res.render("error", {message : "Invalid request"});
    // res.json({ success: false, message: "Link Expired" });
  }
};

exports.updatePassword = async (req, res) => {
  const {email, password, token} = req.body;
  const reset_link = await ResetLink.findOneAndDelete({
    $and : [ {email, token} ],
  });
  if (!reset_link) {
    res.render("error", {message : "Session Link expired"});
    // res.json({ success: false, message: "Session link expired" });
  } else {
    const user = await User.findOne({email});
    if (user) {
      // For successful update
      user.password = password;
      await user.save();
      res.render("success");
    } else {
      // Did not update
      res.render("error", {message : "Can't process the request"});
      // res.json({ success: false, message: "Invaild details" });
    }
  }
};
