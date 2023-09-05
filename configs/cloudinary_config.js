"use strict";
const cloudinary = require("cloudinary");

try {
  if (!process.env.CLOUDINARY_CLOUDNAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  module.exports = cloudinary;
} catch (error) {
  console.error("Cloudinary configuration error:", error);
  process.exit(1); // Exit the application with an error code
}
