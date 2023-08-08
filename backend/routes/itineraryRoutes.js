const express = require("express")
const router = express.Router();
const Itinerary = require("../models/itineraryModel");
const Day = require("../models/dayModel")
const dayRoutes = require('./dayRoutes')
const eventRoutes = require('./eventRoutes')
const moment = require('moment')

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
    
        const startMoment = moment(startDate, 'YYYY-MM-DD');
        const endMoment = moment(endDate, 'YYYY-MM-DD');
        const daysCount = endMoment.diff(startMoment, 'days');
    
        const days = [];

        const durationValue = parseInt(duration.split(" ")[0]);
    
        if (Array.isArray(req.body.days) && req.body.days.length > 0) {
            // If days are already present, update their start dates
            for (const dayId of req.body.days) {
                await updateDayStartDate(dayId, startMoment.clone().add(days.length, 'days').toDate());
                days.push(dayId);
            }
        } 
        else {
            // If days are not present, create new days
            for (let i = 0; i <= daysCount; i++) {
                const date = startMoment.clone().add(i, 'days').toDate();
                const newDay = new Day({ date, events: [] });
                const savedDay = await newDay.save();
                days.push(savedDay._id);
            }
        }
    
        const newItinerary = new Itinerary({ title, image, location, startDate, endDate, duration, description, thoughtBubble, days });
        const savedItinerary = await newItinerary.save();
    
        res.status(200).json(savedItinerary);
    } catch (e) {
        res.status(500).json({ message: e.message });
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