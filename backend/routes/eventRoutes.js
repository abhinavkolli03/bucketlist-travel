const express = require("express")
const router = express.Router();
const Event = require("../models/eventModel");

//fetch all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

//add a new event to the database
router.post("/", async (req, res) => {
    try {
        const { name, keyword, startTime, endTime, duration, typicalDuration, image } = req.body;
        const newEvent = new Event({ name, keyword, startTime, endTime, duration, typicalDuration, image });
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;