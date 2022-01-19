"use strict";
const mongoose = require("mongoose");
//--------------------------------END OF
//IMPORTS--------------------------------------//

//--------------------------------CONTACT US
//SCHEMA-----------------------------------------//
const messageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  details: {
    type: String,
    require: false,
    trim: true,
  },
  // document will be removed after 3 mos(5256000 sec)
  expire_at: { type: Date, default: Date.now, expires: 5256000 },
});
//--------------------------------END CONTACT US
//SCHEMA-----------------------------------------//
messageSchema.index({ expire_at: 1 }, { expireAfterSeconds: 0 });
const Message = mongoose.model("project", messageSchema);
module.exports = Message;
