const multer = require("multer");
const path = require("path");
const isImage = require("is-image");
module.exports = multer({
  storage: multer.diskStorage({
    // extentions
    filename: function (request, file, callback) {
      callback(
        null,
          `${Date.now()}`
      );
    },
  }),
  fileFilter: (req, file, callback) => {
    const basename = path.basename(file.originalname);
    if (!isImage(basename)) {
      return callback(new Error("Unsupported image file"), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, //Max size 5 MB
  },
});
