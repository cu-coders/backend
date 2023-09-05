"use strict";
const cloudinary = require("../configs/cloudinary_config");
const resources = require("../models/resources");
const sanitize = require("mongo-sanitize");
const mailer = require("./mailer");

exports.insertResource = async (req, res) => {
  try {
    const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `resources/${req.body.domain}`,
      use_filename: true,
      resource_type: "auto",
    });

    const { secure_url, public_id } = uploadResult;
    const title = sanitize(req.body.title);
    const subtitle = sanitize(req.body.subtitle);
    const description = sanitize(req.body.description);

    // Validate the input data (e.g., check if required fields are provided)
    if (!title || !subtitle || !description || !req.body.domain) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or invalid data provided.",
      });
    }

    const newResource = new resources({
      title,
      subtitle,
      description,
      domain: req.body.domain,
      resources: secure_url,
      resourcesId: public_id,
    });

    await newResource.save();

    return res.status(201).json({
      success: true,
      message: "Resource added successfully!",
    });
  } catch (error) {
    console.error("Error while inserting resource:", error);

    if (req.file) {
      // Rollback the Cloudinary upload in case of an error
      await cloudinary.v2.uploader.destroy(uploadResult.public_id);
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your resource submission.",
    });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resourcesData = await resources.find();
    return res.status(200).json({ success: true, data: resourcesData });
  } catch (error) {
    console.error("Error while fetching resources:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching resources.",
    });
  }
};
