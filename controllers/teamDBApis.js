"use strict";
const team = require("../models/team");
exports.addTeam = async (req, res, secure_url, public_id) => {
  const teamData = req.body;
  const newTeam = new team({
    profileImage: secure_url,
    publicId: public_id,
    fullname: teamData.fullname,
    role: teamData.role,
    linkedin: teamData.linkedin,
    instagram: teamData.instagram,
    github: teamData.github,
  });
  await newTeam.save();
  res.json({ success: true, message: "new team member added" });
};

exports.getTeam = async (res) => {
  const teamData = await team.find();
  res.json({ success: true, data: teamData });
};
