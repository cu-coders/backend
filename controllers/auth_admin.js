"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const winston = require("winston");

const logger = winston.createLogger({
  level: "error", // Set the log level as needed
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log" }), // Log errors to a file
  ],
});

module.exports.auth = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASS,
    );

    if (!isPasswordValid || username !== process.env.ADMIN_NAME) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ username }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth", token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    res.redirect("./add-events");
  } catch (error) {
    // Use the logger to log the error
    logger.error("Authentication error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};
