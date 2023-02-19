"use strict";
const express = require("express");
const db_apis = require("../controllers/event_db_apis");
const teamDBApis = require("../controllers/teamDBApis");
const resourcesDBApis = require("../controllers/resources_db_apis");
const router = express.Router();

// Public API routes

router.get("/upcoming-events", async (req, res) => {
  try {
    const data = await db_apis.read_upcoming_events(req, res);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
  }
});

router.get("/ongoing-events", async (req, res) => {
  try {
    const data = await db_apis.read_ongoing_events();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
  }
});

router.get("/past-events", async (req, res) => {
  try {
    const data = await db_apis.read_past_events();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
  }
});

router.get("/team", async (req, res) => {
  try {
    const data = await teamDBApis.getTeam();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
  }
});

// For Future "If events are organized by cu"
// router.get('our-events',(req,res)=>{
// })
// router.get("/team", async (req, res) => {
//   try {
//     await teamDBApis.getTeam(res);
//   } catch (error) {
//     res.json({ success: false, message: "Internal server error" });
//   }
// });

router.get("/resources", async (req, res) => {
  try {
    await resourcesDBApis.getResources(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "It's not you. It's on us. We're working on it",
    });
  }
});

module.exports = router;
