const nodemailer = require("nodemailer");
const gen_message = require("../templates/email_verification");
const ackMessage = require("../templates/contact_ack.js");
const resetMessage = require("../templates/resetPassword.js");
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
    // console.log(info);
  } catch (err) {
    console.log(err);
  }
};
exports.sendAck = async (userEmail, subject) => {
  const message = ackMessage.getTemplate(userEmail, subject);
  try {
    await transporter.sendMail(message);
    // console.log(info);
  } catch (err) {
    throw err;
  }
};

exports.sendReset = async (name, email, token, domain) => {
  const message = resetMessage.getTemplate(email, token, name, domain);
  try {
    await transporter.sendMail(message);
  } catch (err) {
    throw err;
  }
};
//--------------------------------------------END OF MAILER
// METHOD---------------------------------------------//
