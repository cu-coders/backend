"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Compare the provided password with the hashed admin password
    const isPasswordValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASS
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    if (username !== process.env.ADMIN_NAME) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, process.env.SECRET, {
      expiresIn: "1h", // Set the token expiration time
    });

    // Set the token as an HttpOnly cookie
    res.cookie("auth", token, {
      maxAge: 3600000, // 1 hour in milliseconds
      httpOnly: true,
    });

    // Redirect to the desired endpoint (e.g., "./add-events")
    res.redirect("./add-events");
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};
