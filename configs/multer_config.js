"use strict";
const multer = require("multer");
const path = require("path");
const isImage = require("is-image");

const storage = multer.diskStorage({
  filename(request, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const fileName = `${uniqueSuffix}${extension}`;
    callback(null, fileName);
  },
});

const imageFilter = (req, file, callback) => {
  const basename = path.basename(file.originalname);
  if (!isImage(basename)) {
    return callback(new Error("Unsupported image file format"), false);
  }
  return callback(null, true);
};

const docFilter = (req, file, callback) => {
  const extension = path.extname(file.originalname);
  if (extension === ".pdf" || extension === ".docx") {
    return callback(null, true);
  }
  return callback(new Error("Unsupported document file format"), false);
};

exports.uploadImage = multer({
  storage,
  fileFilter : imageFilter,
  limits : {
    fileSize : 1024 * 1024 * 5, // Max size 5 MB
  },
});

exports.uploadDoc = multer({
  storage,
  fileFilter : docFilter,
  limits : {
    fileSize : 1024 * 1024 * 20, // Max size 20 MB
  },
});
