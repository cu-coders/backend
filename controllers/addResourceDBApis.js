"use strict";
const cloudinaryConfig = require("../configs/cloudinary_config");
const Resource = require("../models/addResource");
const sanitize = require("mongo-sanitize");
const mailer = require("./mailer");

exports.addResource = async (req, res) => {
  const uploadResult = await cloudinaryConfig.v2.uploader.upload(
    req.file.path,
    {
      folder: `addResource/${req.body.role}`,
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
    //await mailer.applicationAck(email, role, name);
    await newResource.save();
    res.json({ success: true, message: "Submitted Successfully!" });
  } catch (error) {
    await cloudinaryConfig.uploader.destroy(newResource.resourceId);
    throw error;
  }
};
