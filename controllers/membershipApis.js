"use strict";
const sanitize = require("mongo-sanitize");
const Membership = require("../models/membership");
const mailer = require("./mailer");
//--------------------------------END OF
//IMPORTS---------------------------------------//
exports.insertMembership = async (req, res) => {
  const email = sanitize(req.body.email);
  const fullname = sanitize(req.body.fullname);
  const collegename = sanitize(req.body.collegename);
  const collegeid = sanitize(req.body.collegeid);
  const branch = sanitize(req.body.branch);
  const year = sanitize(req.body.year);
  try {
    const membership = new Membership({
      email,
      fullname,
      collegename,
      collegeid,
      branch,
      year,
    });
    await mailer.sendAck(membership.email, membership.fullname);
    await membership.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
