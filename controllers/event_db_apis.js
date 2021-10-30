"use strict";
const Event = require("../models/events");
//------------------------------------------------END OF
//IMPORTS----------------------------//

//-----------------------------------------------EVENT DATABASE
//APIs--------------------------//
exports.insert_event = async (req, res, imageURL, public_id) => {
  try {
    const tempData = req.body;
    const event = new Event({
      imageSrc: imageURL,
      imageId: public_id,
      author: tempData.author,
      category: tempData.category,
      title: tempData.title,
      subtitle: tempData.subtitle,
      description: tempData.description,
      url: tempData.url,
      date_start: new Date(tempData.date_start).getTime(),
      date_end: new Date(tempData.date_end).getTime(),
    });
    await event.save();
  } catch (err) {
    throw new Error(err);
  }
};

// API for ongoing events
exports.read_ongoing_events = async (req, res) => {
  try {
    const data = await Event.find({
      $and: [
        { date_start: { $lte: Date.now() } },
        { date_end: { $gte: Date.now() } },
      ],
    });
    return data;
  } catch (err) {
    //console.log(data);
  }
};

// API for upcomming events
exports.read_upcomming_events = async () => {
  try {
    const data = await Event.find({ date_start: { $gt: Date.now() } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// API for past events
exports.read_past_events = async () => {
  try {
    const data = await Event.find({ date_end: { $lt: Date.now() } });
    return data;
  } catch (err) {
    console.log(err);
  }
};
//----------------------------------END OF EVENT DATABASE
//APIs----------------------------------------//
