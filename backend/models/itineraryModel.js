const mongoose = require("mongoose");
const Day = require('./dayModel')
const { Schema } = mongoose;

const itinerarySchema = new mongoose.Schema({
    title: String,
    image: String,
    location: String,
    startDate: String,
    endDate: String,
    duration: String,
    description: String,
    thoughtBubble: String,
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }]
})

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;