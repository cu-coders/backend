const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  profileImage: {
    type: String,
    require: true,
    trim: true,
  },
  publicId: {
    type: String,
    trim: true,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
    trim: true,
  },
  role: {
    type: String,
    require: true,
    trim: true,
  },
  linkedin: {
    type: String,
    require: true,
    trim: true,
  },
  instagram: {
    type: String,
    require: true,
    trim: true,
  },
  github: {
    type: String,
    require: true,
    trim: true,
  },
});
const Team = mongoose.model("team", teamSchema);
module.exports = Team;
