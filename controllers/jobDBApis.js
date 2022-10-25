"use strict";
const cloudinaryConfig = require("../configs/cloudinary_config");
const Job = require("../models/jobs");
const sanitize = require("mongo-sanitize");
const mailer = require("./mailer");

exports.addJobApplication = async (req, res) => {
  const uploadResult = await cloudinaryConfig.v2.uploader.upload(
    req.file.path,
    {
      folder: `resume/${req.body.role}`,
      use_filename: true,
      resource_type: "auto",
    }
  );
  const { secure_url, public_id } = uploadResult;
  const name = sanitize(req.body.name);
  const email = sanitize(req.body.email);
  const reason_to_join = sanitize(req.body.reason_to_join);
  const number = sanitize(req.body.number);
  const role = sanitize(req.body.role);
  const newApplicant = new Job({
    name,
    email,
    reason_to_join,
    number,
    role,
    resume: secure_url,
    resumeId: public_id,
  });
  try {
    await mailer.applicationAck(email, role, name);
    await newApplicant.save();
    res.json({ success: true, message: "Applied Successfully!" });
  } catch (error) {
    await cloudinaryConfig.uploader.destroy(newApplicant.resumeId);
    throw error;
  }
};
