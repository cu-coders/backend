const mongoose = require("mongoose");
//--------------------------------END OF
// IMPORTS--------------------------------------//

//--------------------------------CONTACT US
// SCHEMA-----------------------------------------//
const messageSchema = mongoose.Schema({
  email : {
    type : String,
    require : true,
    trim : true,
  },
  fullname : {
    type : String,
    require : true,
    trim : true,
  },
  subject : {
    type : String,
    require : true,
    trim : true,
  },
  message : {
    type : String,
    require : true,
    trim : true,
  },
  // document will be removed after 3 mos(5256000 sec)
  expire_at : {type : Date, default : Date.now, expires : 5256000},
});
//--------------------------------END CONTACT US
// SCHEMA-----------------------------------------//
messageSchema.index({expire_at : 1}, {expireAfterSeconds : 0});
const Message = mongoose.model("message", messageSchema);
module.exports = Message;
