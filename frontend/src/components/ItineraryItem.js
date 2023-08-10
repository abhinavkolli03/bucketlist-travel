import React from 'react';
import "../styling/itinerarytab.css"
import moment from "moment"
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItineraryItem = ({ itin, onItineraryEdit, onItineraryClick, onItineraryDelete }) => {

  const handleItineraryEdit = (e) => {
    e.stopPropagation();
    console.log(itin._id)
    onItineraryEdit(itin._id);
  };

  const handleDayTrackerClick = () => {
    onItineraryClick(itin._id);
  }

  const handleItineraryDelete = (e) => {
    e.stopPropagation();
    console.log(itin)
    console.log(itin._id)
    onItineraryDelete(itin._id)
  }

  return (
    <div key={itin.id} className="itin-tab-item bg-purple-100 p-4 rounded-lg shadow-lg flex items-start space-x-4 cursor-pointer transform transition hover:scale-105 w-full" onClick={handleDayTrackerClick}>
      <div className="itin-tab-image-container w-1/4 h-80 overflow-hidden flex justify-center items-center">
        <img className="itin-tab-image object-cover h-full rounded-md" src={require("../test-images/" + itin.image)} alt={itin.title} />
      </div>
      <button className="edit-button bg-purple-400 text-white p-2 rounded-full shadow-md hover:bg-purple-300 transition" onClick={handleItineraryEdit}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <div className="itin-tab-content w-2/4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{itin.title}</h3>
        <p className="text-gray-600 text-sm mb-1"><b>Dates:</b> {formatDate(itin.startDate)} - {formatDate(itin.endDate)}</p>
        <p className="text-gray-600 text-sm mb-1"><b>{itin.duration}</b></p>
        <p className="text-gray-700">{itin.description}</p>
      </div>
      <button className="delete-button bg-purple-400 text-white p-2 rounded-full shadow-md" onClick={handleItineraryDelete}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
  
  
  
};

const formatDate = (date) => {
  const adjustedDate = moment(date).format("MMMM Do, YYYY");
  return adjustedDate;
}

export default ItineraryItem;