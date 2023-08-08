const express = require("express")
const router = express.Router();
const Day = require("../models/dayModel");

//fetch all days for specific itinerary
router.get("/", async (req, res) => {
    try {
        const itineraryId = req.params.itineraryId;
        const days = await Day.find({ itinerary: itineraryId });
        res.status(200).json(days);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// fetch specific day
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const day = await Day.findById(id);
        if (!day) {
            return res.status(404).json({ message: `Cannot find day with ID ${id}` });
        }
        res.status(200).json(day);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


//add a new day to the database
router.post("/", async (req, res) => {
    try {
        const { date, events } = req.body;
        const newDay = new Day({ date, events });
        const savedDay = await newDay.save();
        res.status(200).json(savedDay);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

//update days
router.put('/:id/startDate', async (req, res) => {
    try {
        const { startDate } = req.body
        const { id } = req.params
        // Find the day by ID and update its start date
        const updatedDay = await Day.findByIdAndUpdate(id, { date: startDate }, { new: true });
        res.status(200).json(updatedDay);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

module.exports = router;