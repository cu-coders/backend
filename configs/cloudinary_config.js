"use strict";
const cloudinary = require("cloudinary");
const winston = require("winston");

try {
  if (!process.env.CLOUDINARY_CLOUDNAME || !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUDNAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
  });

  module.exports = cloudinary;
} catch (error) {
  // Configure Winston logger
  const logger = winston.createLogger({
    level : "error", // Set log level to "error" for production
    format : winston.format.json(),
    transports : [
      new winston.transports.File(
          {filename : "error.log"}), // Log errors to a file
    ],
  });

  logger.error("Cloudinary configuration error:", error);

  // Optionally, you can also send error notifications or take other actions
  // here

  process.exit(1); // Exit the application with an error code
}
