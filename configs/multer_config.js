"use strict";
const multer = require("multer");
const path = require("path");
const isImage = require("is-image");

const storage = multer.diskStorage({
  // extentions
  filename(request, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

exports.uploadImage = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const basename = path.basename(file.originalname);
    if (!isImage(basename)) {
      return callback(new Error("Unsupported image file"), false);
    }
    return callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, //Max size 5 MB
  },
});

exports.uploadDoc = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const extenson = path.extname(file.originalname);
    if (extenson === ".pdf" || extenson === ".docx") {
      return callback(null, true);
    }
    return callback(new Error("Unsupported file format"));
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
