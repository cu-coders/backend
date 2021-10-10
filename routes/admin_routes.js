const express = require("express");
const multer = require("multer");
const isImage = require("is-image");
const auth_admin = require("../controllers/auth_admin");
const db_apis = require("../controllers/event_db_apis");
const jwt = require("jsonwebtoken");
const path = require("path");
//----------------------------------END of
//IMPORTS------------------------------------//
const router = express.Router();
//----------------------------------  MULTER ---------------------------------//
// defining images for images
const storage = multer.diskStorage({
  destination : function(
      request, file,
      callback) { callback(null, path.join(__dirname, "../public/covers")); },
  // extentions
  filename : function(request, file, callback) {
    const suff = Math.round(Math.random() * 1e9);
    callback(null, path.parse(file.originalname).name + "_" + Date.now() + "_" +
                       suff + path.extname(file.originalname));
  },
});

// upload parameters for multer
const upload =
    multer({
      storage : storage,
      limits : {
        // file size limit is 8MB
        fieldSize : 1024 * 1024 * 8,
      },

      fileFilter : function(request, file, callback) {
        const name = path.basename(file.originalname);
        if (!isImage(name)) {
          return callback(new Error("Uploaded File is not an Image"));
        }
        callback(null, true);
      },
    }).single("cover");
//------------------------------------END OF MULTER
//---------------------------------//
//-------------------------------------ADMIN
//ROUTES----------------------------------//
// sends form to add event
router.get("/add-events", (req, res) => {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({message : "Opps!Something went wrong"});
      } else if (decoded === process.env.ADMIN_NAME) {
        res.render("./add-events");
      } else {
        res.redirect("./login");
      }
    });
  } else {
    res.redirect("./login");
  }
});
// saves form to the database
router.post("/add-events", upload, async (req, res) => {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.status(500).json({message : "Opps! Something went wrong"});
      } else if (decoded === process.env.ADMIN_NAME) {
        try {
          await db_apis.insert_event(req, res);
          res.status(200).send("uploaded");
        } catch (err) {
          res.status(403).send(err.message);
        }
      } else {
        res.redirect("./login");
      }
    });
  } else {
    res.redirect("./login");
  }
});
// sends admin login form
router.get("/login", (req, res) => {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({message : "Opps! Something went wrong"});
      } else if (decoded === process.env.ADMIN_NAME) {
        res.redirect("./add-events");
      } else {
        res.render("login");
      }
    });
  } else {
    res.render("login");
  }
});

router.post("/login", (req, res) => { auth_admin.auth(req, res); });

router.get('/logout',(req,res)=>{
    res.clearCookie('auth')
    res.redirect('./login')
})
    //---------------------------------------------END OF
    //ROUTES------------------------------------//

    module.exports = router;
