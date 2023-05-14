const express = require("express");
const router = new express.Router();
const { getEventById, getAllEvents, createEvent, updateEvent, deleteEvent } = require('../contollers/eventController');
const uploadFunction = require('../middleware/imageUpload');

router.get("/event/:id", getEventById);
router.get("/events", getAllEvents)
router.post("/event", uploadFunction, createEvent);
router.put("/events/:id", uploadFunction, updateEvent);
router.delete("/even/:id", deleteEvent);


module.exports = router;