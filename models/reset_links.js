const mongoose = require("mongoose");
//--------------------------------END OF
//IMPORTS--------------------------------------//

//--------------------------------RESET LINKS
//SCHEMA-----------------------------------------//
const resetLinkSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
  },
  token: {
    type: String,
    require: true,
    trim: true,
  },
  // Expires after 5 mins
  expire_at: { type: Date, default: Date.now, expires: 300 },
});
resetLinkSchema.index({ expire_at: 1 }, { expireAfterSeconds: 0 });
resetLinkSchema.post("update",function(next){
  this.expire_at
})
const ResetLink = mongoose.model("resetLink", resetLinkSchema);
module.exports = ResetLink;
