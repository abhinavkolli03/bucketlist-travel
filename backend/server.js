const mongoose = require("mongoose");
const express = require("express")
const cors = require("cors");
const Itinerary = require("./models/itineraryModel");
require("dotenv").config();

//define app
const app = express();
app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose 
    .connect(process.env.MONGO_SERVER)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3001, () => {
            console.log("Node API is running on port 3001")
        });
    })
    .catch((error) => {
        console.log(error);
    });

//Test route
app.get("/", (req, res) => {
    res.send("Test node api")
})

//Fetch all itineraries in itineraries-db
app.get("/itineraries", async (req, res) => {
    try {
        const itineraries = await Itinerary.find({});
        res.status(200).json(itineraries);
    } catch (e) {
        res.status(500).json({ message: e.message});
    }
})

//Fetch a single itinerary given the id
app.get("/itineraries/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const itin = await Itinerary.findById(id);
        res.status(200).json(itin);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//Add a new itinerary into itineraries-db
app.post("/itineraries", async (req, res) => {
    try {
        const { title, image, location, startDate, endDate, duration, description, thoughtBubble, } = req.body;
        const newItinerary = new Itinerary({ title, image, location, startDate, endDate, duration, description, thoughtBubble });
        const savedItinerary = await newItinerary.save();
        res.status(200).json(savedItinerary)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//update existing itinerary
app.put("/itineraries/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findByIdAndUpdate(id, req.body);
        //if no itinerary found in itineraries-db
        if (!itinerary) {
            return res
                .status(404)
                .json({ message: `cannot find itinerary with ID ${id}`});
        }
        //otherwise process and return json
        const updatedItin = await Itinerary.findById(id);
        res.status(200).json(updatedItin);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//delete current itinerary
app.delete("/itineraries/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findByIdAndDelete(id);
        //if no itinerary found in itineraries-db
        if (!itinerary) {
            return res
                .status(404)
                .json({ message: `cannot find itinerary with ID ${id}`});
        }
        res.status(200).json(itinerary);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})