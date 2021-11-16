"use strict";
const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  name : {
    type : String,
    require : true,
  },
  role : {
    type : String,
    require : true,
  },
  email : {
    type : String,
    require : true,
  },
  address : {
    type : String,
    require : true,
  },
  number : {
    type : String,
    require : true,
  },
  resume : {
    type : String,
    require : true,
  },
  resumeId : {
    type : String,
  },
});
const Job = mongoose.model("job-application", jobSchema);
module.exports = Job;