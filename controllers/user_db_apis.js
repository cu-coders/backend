"use strict";
const sanitize = require("mongo-sanitize");
const User = require("../models/users");
const bcrypt = require("bcrypt");
//-------------------------------------END OF IMPORTS--------------------------------------//

//--------------------------------USER REGISTRATION VIA EMAIL------------------------------//
// to add new user data to DB(registration)
exports.register = async (req, res) => {
  const tempData = req.body;
  const email = sanitize(req.body.email);
  const firstname = sanitize(req.body.firstname);
  const lastname = sanitize(req.body.lastname);
  const password = sanitize(req.body.password);
  try {
    const e_user = await User.findOne({ email });
    if (e_user) {
      // Email is already registered
      res.send({ message: "An account with this email already exists" });
    } else {
      // Registering new user
      const salt = await bcrypt.genSalt(10);
      const user = await new User({
        firstname,
        lastname,
        email,
        password,
        mailtoken: await bcrypt.hash(
          tempData.email + Date.now().toString(),
          salt
        ),
        isactive: false,
        auth_type: "email",
        third_partyID: null,
      });

      // Sending the verification mail to the user-email
      const isSent = await user.send_verification(req);
      if (isSent) {
        user.save();
        res.send({ message: "Registered, please visit your email" });
      } else {
        // vaification email was not sent
        res.status(400).res({ message: "Can't verify the email address." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).res({ message: "Something went wrong" });
  }
};
//---------------------------------------END OF USER REGISTRATION VIA EMAIL-----------------------------//

//---------------------------------------API TO VARIFY USER EMAIL REQUEST-------------------------------//
exports.verify_mail = async (req, res) => {
  try {
    const mailtoken = sanitize(req.query.token);
    const user = await User.findOne({ mailtoken });
    if (user) {
      user.mailtoken = null;
      user.isactive = true;
      await user.save();
      res.send("Verified");
    } else {
      res.send("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};
//---------------------------------------END API TO VARIFY USER EMAIL REQUEST-------------------------------//
