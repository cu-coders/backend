"use strict";
const nodemailer = require("nodemailer");
const gen_message = require("../templates/email_verification");
const ackMessage = require("../templates/contact_ack.js");
const resetMessage = require("../templates/resetPassword.js");
const applicationMessage = require("../templates/job_ack.js");
const projectMessage = require("../templates/project_ack.js");
const resourceMessage = require("../templates/resource_ack.js");
const membershipMessage = require("../templates/membership_ack.js");
const winston = require("winston");

const transporter = nodemailer.createTransport({
  // Use the appropriate email service settings here
  host: "smtppro.zoho.in",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const logger = winston.createLogger({
  level: "error", // Set the log level as needed
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "email_error.log" }), // Log email errors to a file
  ],
});

async function sendEmail(message) {
  try {
    await transporter.sendMail(message);
    return true;
  } catch (err) {
    // Use the logger to log the email sending error
    logger.error("Error while sending email:", err);
    return err;
  }
}

exports.send_verification = async (userEmail, username, domain, token) => {
  const message = gen_message.getTemplate(userEmail, username, domain, token);
  return sendEmail(message);
};

exports.sendAck = async (userEmail, fullname, subject) => {
  const message = ackMessage.getTemplate(userEmail, fullname, subject);
  return sendEmail(message);
};

exports.sendReset = async (name, email, token, domain) => {
  const message = resetMessage.getTemplate(email, token, name, domain);
  return sendEmail(message);
};

exports.applicationAck = async (email, role, name) => {
  const message = applicationMessage.getTemplate(email, role, name);
  return sendEmail(message);
};

exports.projectAck = async (email, name) => {
  const message = projectMessage.getTemplate(email, name);
  return sendEmail(message);
};

exports.resourceAck = async (email, name) => {
  const message = resourceMessage.getTemplate(email, name);
  return sendEmail(message);
};

exports.membershipAck = async (email, name) => {
  const message = membershipMessage.getTemplate(email, name);
  return sendEmail(message);
};
