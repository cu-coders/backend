"use strict";
const mongoose = require("mongoose");
const resourcesSchema = mongoose.Schema({
  imageSrc: {
    type: String,
    require: true,
    trim: true,
  },
  imageId: {
    type: String,
    require: true,
    trim: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  subtitle: {
    type: String,
    require: true,
    trim: true,
  },
  resources: {
    type: String,
    require: true,
  },
  resourcesId: {
    type: String,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  domain: {
    type: String,
    require: true,
    enum: [
      "Data-Structure-Algorithms",
      "Competitive-Programming",
      "Web-Development",
      "Programming-Languages",
      "AI-and-ML",
      "Database",
      "Security",
      "Version-Control",
      "Mobile-Development",
      "Cloud-DevOps",
    ],
  },
});

//--------------------------------END RESOURCES
//SCHEMA---------------------------------------//
//----------------------------------DB
//MIDDLEWARES-----------------------------------------//
// For invalid Date range
resourcesSchema.pre("save", async function (next) {
  const uploadDate = this.date_start;
  const date = this.date.now();
  if (date > uploadDate) {
    // Removes the uploaded resources
    await cloudinaryConfig.uploader.destroy(this.imageId);
    throw new Error("Invalid upload date");
  } else {
    next();
  }
});
//--------------------------------END OF DB
//MIDDLEWARES-----------------------------------------//
const Resources = new mongoose.model("resources", resourcesSchema);
module.exports = Resources;
