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
    <div key={itin.id} className="itin-tab-item" onClick={handleDayTrackerClick}>
      <div className="itin-tab-image-container">
        <img className="itin-tab-image" src={require("../test-images/" + itin.image)} alt={itin.title} />
      </div>
      <button className="edit-button" onClick={handleItineraryEdit}>
        <FontAwesomeIcon icon={faPencilAlt} />      
      </button>
      <div className="itin-tab-content">
        <h3>{itin.title}</h3>
        <p style={{fontSize: 15}}><b>Dates: {formatDate(itin.startDate)} - {formatDate(itin.endDate)}</b></p>
        <p><b>{itin.duration}</b></p>
        <p>{itin.description}</p>
      </div>
      <button className="delete-button" onClick={handleItineraryDelete}>
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