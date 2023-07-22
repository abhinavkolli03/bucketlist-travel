const mongoose = require("mongoose");
const express = require("express")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose.connect("mongodb+srv://abhinavkolli03:Actually03***@travel-itineraries-clus.tlgt8he.mongodb.net/itinerariesDB")

//require routes
app.use("/", require("./routes/itinRoute"))

app.listen(3001, function() {
    console.log("express server is running on port 3001");
})