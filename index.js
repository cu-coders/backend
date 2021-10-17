require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const api_routes = require("./routes/api_routes");
const auth_routes = require("./routes/auth_routes");
const admin_routes = require("./routes/admin_routes");
const contactUsRoutes = require("./routes/contactForm_routes");
const cors = require("cors");
const passport = require("passport");
// const hbs = require("hbs");
//-----------------------------------------------END OF
//IMPORTS---------------------------------------//

//-------------------------------------------DATABASE CONNECTION
//SETUP----------------------------------------//
const app = express();
const PORT = process.env.PORT || 3001;

// Demo database: Connect to a actual database before deployment
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening at PORT: ${PORT}`);
    });
  });
app.set("trust proxy", 1);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   if ("OPTIONS" === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });
// Whitelisting requests
var whitelist = ["https://cuchapter.tech", "https://main.cuchapter.tech"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(
  cors({
    // The following address is for testing only, change it accordingly in
    // production
    origin: corsOptions,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//----------------------------------------END OF DATABASE CONNECTION
//SETUP----------------------------------------//

//---------------------------------------------------MIDDLEWARES-------------------------------------------------//

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "./templates/pages"));
app.set("view engine", "hbs");
app.disable("X-powered-by");
//------------------------------------------------END OF
//MIDDLEWARES--------------------------------------------//

//-----------------------------------------------------ROUTINGS-------------------------------------------------//
app.use("/api/", api_routes);
app.use("/auth/", auth_routes);
app.use("/admin/", admin_routes);
app.use("/contact-us", contactUsRoutes);
//---------------------------------------------------END OF
//ROUTINGS--------------------------------------------//
