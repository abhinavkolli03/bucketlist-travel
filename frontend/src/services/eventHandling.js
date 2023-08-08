import axios from "axios"

//retrieve each individual day's details
export async function fetchDayDetails(dayId) {
    try {
        const response = await axios.get(`http://localhost:3001/days/${dayId}`)
        return response.data
    } catch (e) {
        console.error(`Error fetching day with ID ${dayId}: `, e.message)
        throw e
    }
}

//retrieve all dates
export async function getEventDates(dayIds) {
    try {
        const response = await axios.get(
            "http://localhost:3001/days", {
                params: { ids: dayIds },
        });
        console.log("Dates for itinerary retrieved: ", response.data)
        return response.data;
    } catch (e) {
        console.error("Error retrieving dates for itinerary: ", e.message)
        throw e;
    }
}

//update start dates
export const updateDayStartDate = async (dayId, startDate) => {
    try {
        const updatedDay = await axios.put(`/api/days/${dayId}/start-date`, { startDate });
        return updatedDay.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
  