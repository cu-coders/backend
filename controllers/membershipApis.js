"use strict";
const cloudinaryConfig = require("../configs/cloudinary_config");
const sanitize = require("mongo-sanitize");
const Membership = require("../models/membership");
const mailer = require("./mailer");
//--------------------------------END OF
// IMPORTS---------------------------------------//
exports.insertMembership = async (req, res) => {
  const uploadResult = await cloudinaryConfig.v2.uploader.upload(
    req.file.path,
    {
      folder: `CollegeID/${req.body.college}/${req.body.year}`,
      use_filename: true,
      resource_type: "auto",
    }
  );
  const { secure_url, public_id } = uploadResult;
  const email = sanitize(req.body.email);
  const fullname = sanitize(req.body.fullname);
  const collegename = sanitize(req.body.collegename);
  const collegeid = sanitize(req.body.collegeid);
  const branch = sanitize(req.body.branch);
  const year = sanitize(req.body.year);
  const phonenumber = sanitize(req.body.phonenumber);
  try {
    const e_user = await Membership.findOne({ email });
    const e_collegeID = await Membership.findOne({ collegeid });
    if (e_user) {
      // Email is already registered
      res.status(400);
      // res.statusText("An account with this email already exists");
      res.send({
        message: "An account with this email already exists",
      });
    } else if (e_collegeID) {
      res.status(400);
      // res.statusText("An account with this college id already exists");
      res.send({
        message: "An account with this college id already exists",
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
      res
        .status(200)
        .json({ success: true, message: "Congrats! Now, you're a Member!" });
    }
  } catch (err) {
    await cloudinaryConfig.uploader.destroy(membership.imageID);
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
    throw err;
  }
};
