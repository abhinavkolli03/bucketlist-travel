const express = require("express")
const router = express.Router();
const Itinerary = require("../models/itineraryModel");
const Day = require("../models/dayModel")
const dayRoutes = require('./dayRoutes')
const eventRoutes = require('./eventRoutes')

//fetch all itineraries
router.get("/", async (req, res) => {
    try {
        const itineraries = await Itinerary.find({})
        res.status(200).json(itineraries)
    } catch (e) {
        res.status(500),json({message: e.message})
    }
})

//fetch an individual itinerary
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findById(id);
        res.status(200).json(itinerary)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//Add a new itinerary into itineraries-db
router.post("/", async (req, res) => {
    try {
        const { title, image, location, startDate, endDate, duration, description, thoughtBubble } = req.body;

        //calculate days between startDate and endDate
        const start = new Date(startDate);
        const end = new Date(endDate);
        const daysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

        const days = []

        //populating days array with empty events for each day
        for (let i = 0; i < daysCount; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i)
            // Create a new Day object and save it
            const newDay = new Day({ date, events: [] });
            const savedDay = await newDay.save();
            days.push(savedDay._id)
        }

        if (daysCount == 0) {
            const date = new Date(start);
            const newDay = new Day({ date, events: [] })
            const savedDay = await newDay.save()
            days.push(savedDay._id)
        }

        const newItinerary = new Itinerary({ title, image, location, startDate, endDate, duration, description, thoughtBubble, days });
        const savedItinerary = await newItinerary.save();
        res.status(200).json(savedItinerary)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//update existing itinerary
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findByIdAndUpdate(id, req.body);
        //if no itinerary found in itineraries-db
        if (!itinerary) {
            return res.status(404).json({ message: `cannot find itinerary with ID ${id}`});
        }
        //otherwise process and return json
        const updatedItin = await Itinerary.findById(id);
        res.status(200).json(updatedItin);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//delete current itinerary
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findByIdAndDelete(id);
        //if no itinerary found in itineraries-db
        if (!itinerary) {
            return res.status(404).json({ message: `cannot find itinerary with ID ${id}`});
        }
        res.status(200).json(itinerary);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

router.use("/:itineraryId/days", dayRoutes)
router.use("/:itineraryId/events", eventRoutes)

module.exports = router;