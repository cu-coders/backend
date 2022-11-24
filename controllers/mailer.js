"use strict";
const nodemailer = require("nodemailer");
const gen_message = require("../templates/email_verification");
const ackMessage = require("../templates/contact_ack.js");
const resetMessage = require("../templates/resetPassword.js");
const applicationMessage = require("../templates/job_ack.js");
const projectMessage = require("../templates/project_ack.js");
const resourceMessage = require("../templates/resource_ack.js");
const membershipMessage = require("../templates/membership_ack.js");
//--------------------------------------------END OF
// IMPORTS--------------------------------------------------//
//-------------------------------------------CONFIG.
// TRANSPORTER-------------------------------------------//
const transporter = nodemailer.createTransport({
  // service: process.env.EMAIL_SERVICE_NAME,
  host: "smtppro.zoho.in",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
//-----------------------------------------END CONFIG.
// TRANSPORTER-------------------------------------------//

//----------------------------------------------MAILER
// METHOD--------------------------------------------------//
exports.send_verification = async (userEmail, username, domain, token) => {
  const message = gen_message.getTemplate(userEmail, username, domain, token);
  try {
    await transporter.sendMail(message);
    return true;
  } catch (err) {
    return err;
  }
};
exports.sendAck = async (userEmail, fullname, subject) => {
  const message = ackMessage.getTemplate(userEmail, fullname, subject);
  await transporter.sendMail(message);
};

exports.sendReset = async (name, email, token, domain) => {
  const message = resetMessage.getTemplate(email, token, name, domain);
  await transporter.sendMail(message);
};

exports.applicationAck = async (email, role, name) => {
  const message = applicationMessage.getTemplate(email, role, name);
  await transporter.sendMail(message);
};

exports.projectAck = async (email, name) => {
  const message = projectMessage.getTemplate(email, name);
  await transporter.sendMail(message);
};

exports.resourceAck = async (email, name) => {
  const message = resourceMessage.getTemplate(email, name);
  await transporter.sendMail(message);
};

exports.membershipAck = async (email, name) => {
  const message = membershipMessage.getTemplate(email, name);
  await transporter.sendMail(message);
};
//--------------------------------------------END OF MAILER
// METHOD---------------------------------------------//
