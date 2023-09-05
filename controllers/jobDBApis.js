"use strict";
const cloudinary = require("../configs/cloudinary_config");
const Job = require("../models/jobs");
const sanitize = require("mongo-sanitize");
const mailer = require("./mailer");
const winston = require("winston");

const logger = winston.createLogger({
  level: "error", // Set the log level as needed
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log" }), // Log errors to a file
  ],
});

exports.addJobApplication = async (req, res) => {
  let uploadResult; // Declare the variable outside the try-catch to ensure access in the catch block

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume file provided for upload.",
      });
    }

    uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `resume/${req.body.role}`,
      use_filename: true,
      resource_type: "auto",
    });

    const { secure_url, public_id } = uploadResult;
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const reason_to_join = sanitize(req.body.reason_to_join);
    const number = sanitize(req.body.number);
    const role = sanitize(req.body.role);

    // Validate the input data (e.g., check if required fields are provided)
    if (!name || !email || !reason_to_join || !number || !role) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    const newApplicant = new Job({
      name,
      email,
      reason_to_join,
      number,
      role,
      resume: secure_url,
      resumeId: public_id,
    });

    await mailer.applicationAck(email, role, name);
    await newApplicant.save();

    return res.status(200).json({
      success: true,
      message: "Your application has been submitted successfully!",
    });
  } catch (error) {
    // Use the logger to log the error
    logger.error("Error while processing job application:", error);

    if (req.file && uploadResult) {
      // Rollback the Cloudinary upload in case of an error
      await cloudinary.v2.uploader.destroy(uploadResult.public_id);
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your application.",
    });
  }
};
