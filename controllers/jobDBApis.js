"use strict";
const cloudinaryConfig = require("../configs/cloudinary_config");
const Job = require("../models/jobs");
const sanitize = require("mongo-sanitize");

exports.addJobApplicaion = async (req, res) => {
  const uploadResult = await cloudinaryConfig.uploader.upload(req.file.path, {
    folder: `resume/${req.body.role}`,
    use_filename: true,
  });
  const { secure_url, public_id } = uploadResult;
  const name = sanitize(req.body.name);
  const email = sanitize(req.body.email);
  const address = sanitize(req.body.address);
  const number = sanitize(req.body.number);
  const role = sanitize(req.body.sanitize);
  const newApplicant = new Job({
    name,
    email,
    address,
    number,
    role,
    resume: secure_url,
    resumeId: public_id,
  });
  try {
    await newApplicant.save();
    res.json({ success: true, message: "Applied Successfully!" });
  } catch (error) {
    await cloudinaryConfig.uploader.destroy(newApplicant.resumeId);
    throw new Error("Cannot add to the database");
  }
};