"use strict";
const mongoose = require("mongoose");
const addResourceSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  resource: {
    type: String,
    require: true,
  },
  resourceId: {
    type: String,
  },
});
const Resource = mongoose.model("resource-application", addResourceSchema);
module.exports = Resource;
