"use strict";
const cloudinaryConfig = require("../configs/cloudinary_config");
const Resource = require("../models/addResources");
const sanitize = require("mongo-sanitize");
const mailer = require("./mailer");

exports.addResources = async (req, res) => {
  const uploadResult = await cloudinaryConfig.v2.uploader.upload(
    req.file.path,
    {
      folder: `addResources/${req.body.domain}`,
      use_filename: true,
      resource_type: "auto",
    }
  );
  const { secure_url, public_id } = uploadResult;
  const name = sanitize(req.body.name);
  const email = sanitize(req.body.email);
  const description = sanitize(req.body.description);
  const number = sanitize(req.body.number);
  const newResource = new Resource({
    name,
    email,
    description,
    number,
    resource: secure_url,
    resourceId: public_id,
  });
  try {
    await mailer.resourceAck(email, name);
    await newResource.save();
    res.json({ success: true, message: "Resources Submitted Successfully!" });
  } catch (error) {
    await cloudinaryConfig.uploader.destroy(newResource.resourceId);
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
    throw error;
  }
};
