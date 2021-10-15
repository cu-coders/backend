const Message = require("../models/message");
const mailer = require("../controllers/mailer")
//--------------------------------END OF
//IMPORTS---------------------------------------//
exports.insertMessage = async (req, res) => {
  const temp_data = req.body;
  try {
    const message = new Message({
      email: temp_data.email,
      fullname: temp_data.fullname,
      subject: temp_data.subject,
      message: temp_data.message,
    });
    await mailer.send_ack(message.email,message.subject);
    await message.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
