const mongoose = require("mongoose");
const express = require("express")
const cors = require("cors");

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

const itineraryRoutes = require("./routes/itineraryRoutes");
const eventRoutes = require("./routes/eventRoutes")
const dayRoutes = require("./routes/dayRoutes")

app.use("/itineraries", itineraryRoutes)
// app.use("/events", eventRoutes)
app.use("/days", dayRoutes)
