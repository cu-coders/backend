"use strict";
const sanitize = require("mongo-sanitize");
const Event = require("../models/events");

exports.insert_event = async (req, imageURL, public_id) => {
  try {
    const tempData = req.body;
    const author = sanitize(tempData.author);
    const category = sanitize(tempData.category);
    const title = sanitize(tempData.title);
    const subtitle = sanitize(tempData.subtitle);
    const description = sanitize(tempData.description);
    const url = sanitize(tempData.url);

    // Validate the input data (e.g., check if required fields are provided)
    if (!author || !category || !title || !subtitle || !description || !url) {
      throw new Error("Incomplete or invalid data provided.");
    }

    const event = new Event({
      imageSrc: imageURL,
      imageId: public_id,
      author,
      category,
      title,
      subtitle,
      description,
      url,
      date_start: new Date(tempData.date_start).getTime(),
      date_end: new Date(tempData.date_end).getTime(),
    });

    await event.save();
  } catch (error) {
    console.error("Error while inserting event:", error);
    throw error;
  }
};

exports.read_ongoing_events = async () => {
  try {
    const data = await Event.find({
      $and: [
        { date_start: { $lte: Date.now() } },
        { date_end: { $gte: Date.now() } },
      ],
    });
    return data;
  } catch (error) {
    console.error("Error while reading ongoing events:", error);
    throw error;
  }
};

exports.read_upcoming_events = async () => {
  try {
    const data = await Event.find({ date_start: { $gt: Date.now() } });
    return data;
  } catch (error) {
    console.error("Error while reading upcoming events:", error);
    throw error;
  }
};

exports.read_past_events = async () => {
  try {
    const data = await Event.find({ date_end: { $lt: Date.now() } });
    return data;
  } catch (error) {
    console.error("Error while reading past events:", error);
    throw error;
  }
};
