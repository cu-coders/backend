"use strict";
const cloudinaryConfig = require("../configs/cloudinary_config");
const resources = require("../models/resources");
const sanitize = require("mongo-sanitize");
const mailer = require("./mailer");

exports.insert_resource = async (req, res, imageURL, public_id) => {
  const uploadResult = await cloudinaryConfig.v2.uploader.upload(
    req.file.path,
    {
      folder: `resources/${req.body.domain}`,
      use_filename: true,
      resource_type: "auto",
    }
  );
  const { secure_url, public_id_1 } = uploadResult;
  const title = sanitize(req.body.title);
  const subtitle = sanitize(req.body.subtitle);
  const description = sanitize(req.body.description);
  const newResources = new resources({
    title,
    subtitle,
    description,
    domain: req.body.domain,
    resources: secure_url,
    resourcesId: public_id_1,
  });
  try {
    await mailer.applicationAck(email, role, name);
    await newResources.save();
    res
      .status(201)
      .json({ success: true, message: "Resource Added Successfully!" });
  } catch (error) {
    await cloudinaryConfig.uploader.destroy(newResources.resourcesId);
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
    throw error;
  }
};

exports.getResources = async (res) => {
  const resourcesData = await resources.find();
  res.status(200).json({ success: true, data: resourcesData });
};
