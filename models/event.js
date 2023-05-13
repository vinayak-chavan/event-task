const mongoose = require('mongoose');
const uuid = require('uuid')
const Schema = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "event"
    },
    uid: {
        type: String, 
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    tagline: {
        type: String,
        required: true,
        trim: true,
    },
    schedule: {
        type: Date,
        required: true,
        trim: true,
    },
    description: {    
        type: String,
        required: true,
        trim: true,
    },
    files: {
        type: String
    },
    moderator:{
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subCategory: {
        type: String,
        required: true,
        trim: true,
    },
    rigorRank: {
        type: Number,
        required: true,
        trim: true,
    },
    attendees: {
        type: []
    }
});


const event = new mongoose.model("event", eventSchema);

module.exports = event;
