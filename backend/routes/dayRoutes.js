const express = require("express")
const router = express.Router();
const Day = require("../models/dayModel");

//fetch all days
router.get("/", async (req, res) => {
    try {
        const days = await Day.find({});
        res.status(200).json(days);
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

module.exports = router;