"use strict";
const sanitize = require("mongo-sanitize");
const Message = require("../models/message");
const mailer = require("./mailer");
//--------------------------------END OF
//IMPORTS---------------------------------------//
exports.insertMessage = async (req, res) => {
  const email = sanitize(req.body.email);
  const fullname = sanitize(req.body.fullname);
  const subject = sanitize(req.body.subject);
  const sMessage = sanitize(req.body.message);
  try {
    const message = new Message({
      email,
      fullname,
      subject,
      message: sMessage,
    });
    await mailer.sendAck(message.email, message.subject, message.fullname);
    await message.save();
    res.status(201).json({ success: true, message: "We will contact you soon!" });
  } catch (err) {
    throw err;
    res.status(500).json({ success: false });
  }
};
