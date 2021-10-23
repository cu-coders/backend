const multer = require("multer");
const path = require("path");
const isImage = require("is-image");
const storage = multer.diskStorage({
  // extentions
  filename: function (request, file, callback) {
    const suff = Math.round(Math.random() * 1e9);
    callback(
      null,
      path.parse(file.originalname).name +
        "_" +
        Date.now() +
        "_" +
        suff +
        path.extname(file.originalname)
    );
  },
});
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const basename = path.basename(file.originalname);
    if (!isImage(basename)) {
      return callback(new Error("Unsupported image file"), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5//Max size 5 MB
},
});
