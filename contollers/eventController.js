const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const event = require('../models/event');
const { successResponse, errorResponse } = require('../utils');

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // check if event exist or not
    const eventData = await event.findOne({ _id: id });
    if (!eventData) {
      return errorResponse(req, res, 'event not found', 404);
    } else {
      return successResponse(req, res, eventData, 200);
    }

  } catch (error) {
    console.log('error--> ', error.message);
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const getAllEvents = async (req, res) => {
  try {

          let { page, size, sort } = req.query;
  
        // If the page is not applied in query
        if (!page) {
  
            // Make the Default value one
            page = 1;
        }
  
        if (!size) {
            size = 5;
        }
  
        //  We have to make it integer because
        // the query parameter passed is string
        const limit = parseInt(size);
  
        // We pass 1 for sorting data in 
        // descending order using ids
        const evenDetails = await event.find().sort(
            { votes: 1, _id: -1 }).limit(limit)
  
        res.send({
            page,
            size,
            Info: evenDetails,
        });

  } catch (error) {
    console.log('error--> ', error.message);
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // check if event exist or not
    const eventData = await event.findOne({ _id: id });
    if (!eventData) {
      return errorResponse(req, res, 'event not found', 404);
    } else {
      // deleteing event from database
      const deletedEvent = await event.findByIdAndDelete(id);
      return successResponse(req, res, deletedEvent, 200);
    }

  } catch (error) {
    console.log('error--> ', error.message);
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const createEvent = async (req, res) => {
  try {

     const payload = {
        uid: uuidv4(),
        name: req.body.name,
        tagline: req.body.tagline,
        schedule: req.body.schedule,
        description: req.body.description,
        files: req.file.filename,
        moderator: req.body.moderator,
        category: req.body.category,
        subCategory: req.body.subCategory,
        rigorRank: req.body.rigorRank,
        attendees: req.body.attendees,
      };

      // adding new event
      const newEvent = new event(payload);
      const insertEvent = await newEvent.save();

    return successResponse(req, res, insertEvent, 201);
  } catch (error) {
    console.log('error--> ', error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // check if event exist or not
    const eventData = await event.findOne({ _id: id });
    if (!eventData) {
      return errorResponse(req, res, 'event not found', 404);
    } else {

        // updating event details
        const updateDetails = await event.findByIdAndUpdate({ _id: id }, {
            name: req.body.name,
            tagline: req.body.tagline,
            schedule: req.body.schedule,
            description: req.body.description,
            files: req.file.filename,
            moderator: req.body.moderator,
            category: req.body.category,
            subCategory: req.body.subCategory,
            rigorRank: req.body.rigorRank,
            attendees: req.body.attendees,
        });

        return successResponse(req, res, updateDetails, 201);
    }

  } catch (error) {
    console.log('error-->', error.message);
    return errorResponse(req, res, "something went wrong", 400);
  }
};

module.exports = { getEventById, getAllEvents, createEvent, updateEvent, deleteEvent };