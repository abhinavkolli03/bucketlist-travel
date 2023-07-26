import axios from "axios";

//add new itinerary
export async function addItinerary(newItinerary) {
    try {
        const response = await axios.post(
            "http://localhost:3001/itineraries",
            newItinerary
        );
        console.log("New itinerary added: ", response.data)
        return response.data;
    } catch (e) {
        console.error("Error adding new itinerary: ", e.message)
        throw e;
    }
}

//get all itineraries
export async function getAllItineraries() {
    try {
        const response = await axios.get(
            "http://localhost:3001/itineraries"
        );
        const itinerariesWithID = response.data.map((itinerary) => ({
            ...itinerary,
            id: itinerary._id
        }));
        console.log("This is all the itineraries: ", itinerariesWithID)
        return itinerariesWithID;
    } catch (e) {
        console.error("Error retrieving itineraries: ", e.message)
        throw e;
    }
}

//delete an itinerary
export async function deleteItinerary(itinId) {
    try {
        const response = await axios.delete(`http://localhost:3001/itineraries/${itinId}`);
        console.log("Deleted itinerary: ", response.data);
        return response.data;
    } catch (e) {
        console.error("Error deleting itinerary: ", e.message);
        throw e;
    }
}

//update an itinerary details
export async function updateItinerary(updatedItin) {
    try {
        const response = await axios.put(
            `http://localhost:3001/itineraries/${updatedItin._id}`,
            updatedItin);
        console.log("Updated Itinerary: ", response.data)
        return response.data;
    } catch (e) {
        console.error("Error when updating the itinerary: ", e.message);
        throw e;
    }
}