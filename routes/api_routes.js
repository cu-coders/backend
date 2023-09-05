"use strict";
const express = require("express");
const router = express.Router();
const db_apis = require("../controllers/event_db_apis");
const teamDBApis = require("../controllers/teamDBApis");
const resourcesDBApis = require("../controllers/resources_db_apis");

// Public API routes

router.get("/upcoming-events", async (req, res) => {
  try {
    const data = await db_apis.read_upcoming_events(req, res);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

router.get("/ongoing-events", async (req, res) => {
  try {
    const data = await db_apis.read_ongoing_events();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

router.get("/past-events", async (req, res) => {
  try {
    const data = await db_apis.read_past_events();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

router.get("/team", async (req, res) => {
  try {
    const data = await teamDBApis.getTeam();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

router.get("/resources", async (req, res) => {
  try {
    const data = await resourcesDBApis.getResources(res);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Helper function to handle errors
function handleError(res, err) {
  res.status(500).json({
    success : false,
    message : "It's not you. It's on us. We're working on it",
  });
}

module.exports = router;
