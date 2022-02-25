"use strict"
const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    details: {
        type: String,
        require: true,
    }
});
const Project = mongoose.model("project", projectSchema);
module.exports = Project;