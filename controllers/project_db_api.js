"use strict";
const sanitize  = require("mongo-sanitize");
const Project = require("../models/message");
const mailer = require("./mailer");
//--------------------------------END OF
//IMPORTS---------------------------------------//
exports.insertMessage = async (req, res) => {
  const email = sanitize(req.body.email);
  const fullname = sanitize(req.body.fullname);
  const details = sanitize(req.body.details);
  try {
    const message = new Project({
      email,
      fullname,
      details,
    });
    await mailer.sendAck(message.email, message.details, message.fullname);
    await message.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
