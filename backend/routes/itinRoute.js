const express = require("express")
const router = express.Router();
const Itinerary = require("../models/itineraryModel");
const { exec } = require("child_process");

router.route("/add").post((req, res) => {
    const { title, image, location, startDate, endDate, duration, description, thoughtBubble } = req.body;


    const finalItin = new Itinerary({
        title,
        image,
        location,
        startDate,
        endDate,
        duration,
        description,
        thoughtBubble,
    })

    finalItin.save();
})

module.exports = router;