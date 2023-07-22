const mongoose = require("mongoose");

const itinerarySchema = {
    title: String,
    image: String,
    location: String,
    startDate: String,
    endDate: String,
    duration: String,
    description: String,
    thoughtBubble: String,
}

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;