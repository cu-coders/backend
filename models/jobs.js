const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  role: {
    type: String,
    require: true,
  },
  applicantName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  resume: {
    type: String,
    require: true,
  },
});
const Job = mongoose.model("job-application", jobSchema);
module.exports = Job;