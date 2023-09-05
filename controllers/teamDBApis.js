"use strict";
const sanitize = require("mongo-sanitize");
const Team = require("../models/team");
const winston = require("winston");

const logger = winston.createLogger({
  level: "error", // Set the log level as needed
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "team_error.log" }), // Log team-related errors to a file
  ],
});

exports.addTeam = async (req, res) => {
  try {
    const secure_url = sanitize(req.file.secure_url);
    const public_id = sanitize(req.file.public_id);
    const fullname = sanitize(req.body.fullname);
    const role = sanitize(req.body.role);
    const linkedin = sanitize(req.body.linkedin);
    const instagram = sanitize(req.body.instagram);
    const github = sanitize(req.body.github);

    // Validate the input data (e.g., check if required fields are provided)
    if (!secure_url || !public_id || !fullname || !role) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    const newTeamMember = new Team({
      profileImage: secure_url,
      publicId: public_id,
      fullname,
      role,
      linkedin,
      instagram,
      github,
    });

    await newTeamMember.save();

    return res.status(201).json({
      success: true,
      message: "New team member added successfully.",
    });
  } catch (error) {
    // Use the logger to log the error
    logger.error("Error while adding team member:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the team member addition.",
    });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const teamData = await Team.find();
    return res.status(200).json({ success: true, data: teamData });
  } catch (error) {
    // Use the logger to log the error
    logger.error("Error while fetching team data:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching team data.",
    });
  }
};
