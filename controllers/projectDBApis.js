"use strict";
const sanitize = require("mongo-sanitize");
const Project = require("../models/project");
const mailer = require("./mailer");
const winston = require("winston");

const logger = winston.createLogger({
  level : "error", // Set the log level as needed
  format : winston.format.json(),
  transports : [
    new winston.transports.File(
        {filename : "project_error.log"}), // Log project errors to a file
  ],
});

exports.insertProject = async (req, res) => {
  try {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const sDetails = sanitize(req.body.details);

    // Validate the input data (e.g., check if required fields are provided)
    if (!name || !email || !sDetails) {
      return res.status(400).json({
        success : false,
        message : "Incomplete or invalid data provided.",
      });
    }

    const project = new Project({
      email,
      name,
      details : sDetails,
    });

    await mailer.projectAck(project.email, project.name);
    await project.save();

    return res.status(200).json({
      success : true,
      message : "Project submitted successfully!",
    });
  } catch (error) {
    // Use the logger to log the error
    logger.error("Error while inserting project:", error);

    return res.status(500).json({
      success : false,
      message : "An error occurred while processing your project submission.",
    });
  }
};
