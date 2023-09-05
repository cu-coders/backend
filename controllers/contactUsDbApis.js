"use strict";
const sanitize = require("mongo-sanitize");
const Message = require("../models/message");
const mailer = require("./mailer");

exports.insertMessage = async (req, res) => {
  try {
    const email = sanitize(req.body.email);
    const fullname = sanitize(req.body.fullname);
    const subject = sanitize(req.body.subject);
    const messageContent = sanitize(req.body.message);

    // Validate the input data (e.g., check if required fields are provided)
    if (!email || !fullname || !subject || !messageContent) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    const message = new Message({
      email,
      fullname,
      subject,
      message: messageContent,
    });

    await mailer.sendAck(message.email, message.subject, message.fullname);
    await message.save();

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully. We will contact you soon!",
    });
  } catch (error) {
    console.error("Error while inserting message:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request. Please try again later.",
    });
  }
};
