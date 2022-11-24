"use strict";
const mongoose = require("mongoose");
const membershipSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  collegename: {
    type: String,
    require: true,
  },
  collegeid: {
    type: String,
    require: true,
  },
  branch: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  phonenumber: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  imageID: {
    type: String,
  },
});
const Membership = mongoose.model("membership", membershipSchema);
module.exports = Membership;
