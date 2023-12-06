"use strict";
require("dotenv").config();
const express = require("express");
const Sentry = require("@sentry/node");
const SentryTracing = require("@sentry/tracing");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const api_routes = require("./routes/api_routes");
const auth_routes = require("./routes/auth_routes");
const admin_routes = require("./routes/admin_routes");
const contactUsRoutes = require("./routes/contactForm_routes");
const forgetPasswordRoutes = require("./routes/forgotPassword_routes");
const jobRoutes = require("./routes/job_routes");
const projectRoutes = require("./routes/projectForm_routes");
const addResourcesRoutes = require("./routes/addResource_routes");
const membershipRoutes = require("./routes/membership_routes");
const cors = require("cors");
const passport = require("passport");
// const csrf = require("csurf");
// const hbs = require("hbs");
//-----------------------------------------------END OF
//IMPORTS---------------------------------------//

//-------------------------------------------DATABASE CONNECTION
//SETUP----------------------------------------//
// const csrfProtection = csrf({ cookie: true });
const app = express();
const PORT = process.env.PORT || 3001;
mongoose.set('strictQuery', false); // Add this line to address the deprecation warning

console.log(process.env.DATABASE_URL)
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "myFirstDatabase"
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
app.set("trust proxy", 1);
// Whitelisting requests
const whitelist = [
  "https://cuchapter.tech",
  "https://main.cuchapter.tech",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://home.cuchapter.tech",
];
const corsOptions = {
  origin(origin, callback) {
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

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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
app.disable("x-powered-by");
//------------------------------------------------END OF
//MIDDLEWARES--------------------------------------------//

//-----------------------------------------------------ROUTINGS-------------------------------------------------//
app.use("/api/", api_routes);
app.use("/jobs/", jobRoutes);
app.use("/auth/", auth_routes);
app.use("/admin/", admin_routes);
app.use("/contact-us", contactUsRoutes);
app.use("/forget", forgetPasswordRoutes);
app.use("/projects/", projectRoutes);
app.use("/resources/", addResourcesRoutes);
app.use("/membership/", membershipRoutes);
app.get("/form-token", (req, res) => {
  res.json({ formToken: "sample token" });
});
//---------------------------------------------------END OF
//ROUTINGS--------------------------------------------//

module.exports = app;
