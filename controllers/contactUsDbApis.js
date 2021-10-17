const Message = require("../models/message");
const mailer = require("./mailer");
//--------------------------------END OF
//IMPORTS---------------------------------------//
exports.insertMessage = async (req, res) => {
  const tempData = req.body;
  try {
    const message = new Message({
      email: tempData.email,
      fullname: tempData.fullname,
      subject: tempData.subject,
      message: tempData.message,
    });
    await mailer.sendAck(message.email, message.subject, message.fullname);
    await message.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
