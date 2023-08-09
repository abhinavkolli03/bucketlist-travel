const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
    },
    locations: {
        type: [String],
    },
    description: {
        type: String,
    },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

const Day = mongoose.model('Day', daySchema)

module.exports = Day;