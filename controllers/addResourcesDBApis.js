"use strict";
const cloudinary = require("../configs/cloudinary_config");
const Resource = require("../models/addResources");
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

exports.addResources = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided for upload.",
      });
    }

    const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `addResources/${req.body.domain}`,
      use_filename: true,
      resource_type: "auto",
    });
    const { secure_url, public_id } = uploadResult;
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const description = sanitize(req.body.description);
    const number = sanitize(req.body.number);

    // Validate the input data (e.g., check if required fields are provided)
    if (!name || !email || !description || !number) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    const newResource = new Resource({
      name,
      email,
      description,
      number,
      resource: secure_url,
      resourceId: public_id,
    });

    await mailer.resourceAck(email, name);
    await newResource.save();

    return res.status(201).json({
      success: true,
      message: "Resource submitted successfully!",
    });
  } catch (error) {
    // Use the logger to log the error
    logger.error("Error while uploading resource:", error);

    if (req.file) {
      // Rollback the Cloudinary upload in case of an error
      await cloudinary.v2.uploader.destroy(uploadResult.public_id);
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};
