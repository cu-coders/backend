const ResetLink = require("../models/reset_links");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { sanitize } = require("express-validator");

async function generateToken(email) {
  try {
    const salt = await bcrypt.genSalt(5);
    token = await bcrypt.hash(email, salt);
    token = token.substring(7);
    return token;
  } catch (err) {
    throw err;
  }
}
exports.handleRquests = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      // handel the req
      const token = await generateToken(email);
      const resetLink = ResetLink({
        email: email,
        token: token,
      });
      await resetLink.save();
      res.json({ success: true, message: user.firstname });
    } else {
      res.json({ success: false, message: "User is not registered" });
    }
  } catch (err) {
    throw err;
  }
};
