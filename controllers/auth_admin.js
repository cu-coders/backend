"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.auth = (req, res) => {
  const cred = req.body;
  if (cred.username && cred.password) {
    bcrypt.compare(cred.password, process.env.ADMIN_PASS, (err, isvalid) => {
      if (err) {
        res.status(500).json({
          success : false,
          message : "It's not you. It's on us. We're working on it",
        });
        res.end();
      } else if (isvalid === true && cred.username === process.env.ADMIN_NAME) {
        jwt.sign(process.env.ADMIN_NAME, process.env.SECRET, (error, token) => {
          if (error) {
            res.status(500).json({message : "Opps! Something went wrong"});
            res.end();
          } else {
            res.cookie("auth", token, {maxAge : 3600000, httpOnly : true});
            res.redirect("./add-events");
          }
        });
      } else {
        res.status(401).json({message : "Invalid credentials"});
        res.end();
      }
    });
  }
};
