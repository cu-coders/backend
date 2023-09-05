"use strict";
const cloudinary = require("../configs/cloudinary_config");
const sanitize = require("mongo-sanitize");
const Membership = require("../models/membership");
const mailer = require("./mailer");
const winston = require("winston");

const logger = winston.createLogger({
  level: "error", // Set the log level as needed
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "membership_error.log" }), // Log membership errors to a file
  ],
});

exports.insertMembership = async (req, res) => {
  let uploadResult; // Declare the variable outside the try-catch to ensure access in the catch block

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided for upload.",
      });
    }

    uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `CollegeID/${req.body.college}/${req.body.year}`,
      use_filename: true,
      resource_type: "auto",
    });

    const { secure_url, public_id } = uploadResult;
    const email = sanitize(req.body.email);
    const fullname = sanitize(req.body.fullname);
    const collegename = sanitize(req.body.collegename);
    const collegeid = sanitize(req.body.collegeid);
    const branch = sanitize(req.body.branch);
    const year = sanitize(req.body.year);
    const phonenumber = sanitize(req.body.phonenumber);

    // Validate the input data (e.g., check if required fields are provided)
    if (!email || !fullname || !collegename || !collegeid || !branch || !year || !phonenumber) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    const e_user = await Membership.findOne({ email });
    const e_collegeID = await Membership.findOne({ collegeid });

    if (e_user) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    } else if (e_collegeID) {
      return res.status(400).json({
        success: false,
        message: "An account with this college ID already exists.",
      });
    } else {
      const membership = new Membership({
        email,
        fullname,
        collegename,
        collegeid,
        branch,
        year,
        phonenumber,
        image: secure_url,
        imageID: public_id,
      });

      await mailer.membershipAck(membership.email, membership.fullname);
      await membership.save();

      return res.status(200).json({
        success: true,
        message: "Congratulations! You are now a member!",
      });
    }
  } catch (error) {
    // Use the logger to log the error
    logger.error("Error while inserting membership:", error);

    if (req.file && uploadResult) {
      // Rollback the Cloudinary upload in case of an error
      await cloudinary.v2.uploader.destroy(uploadResult.public_id);
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your membership application.",
    });
  }
};
