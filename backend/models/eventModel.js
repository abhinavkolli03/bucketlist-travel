const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    typicalDuration: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'placeholder.jpg'
    },
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;