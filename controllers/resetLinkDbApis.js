const ResetLink = require("../models/reset_links");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const mailer = require("../controllers/mailer");
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
  console.log(email);
  try {
    const user = await User.findOne({ email: email });
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
  } catch (err) {
    throw err;
  }
};