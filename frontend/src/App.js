import React, {useState, useEffect} from 'react';
import ItineraryItem from './components/ItineraryItem';
import EditItineraryScreen from './screens/EditItineraryScreen'
import "./App.css"
import DayTrackerScreen from './screens/DayTrackerScreen';
import SortDropdown from './components/SortDropdown'

import itinerariesData from './data/itineraries.js';
import { addItinerary, getAllItineraries, deleteItinerary, updateItinerary } from "./services/itineraryHandling.js";

const App = () => {
  const [isAddingItinerary, setIsAddingItinerary] = useState(false)
  const [itineraries, setItineraries] = useState([])
  //creating change

  const [editedItinerary, setEditedItinerary] = useState(null)
  const [selectedItinerary, setSelectedItinerary] = useState(null)
  const [isEditScreenVisible, setIsEditScreenVisible] = useState(false)
  const [isAddButtonExpanded, setIsAddButtonExpanded] = useState(false);
  const [isDayTrackerOpen, setIsDayTrackerOpen] = useState(false);

  const [selectedSortOption, setSelectedSortOption] = useState("relevance")

  //retrieve initial itineraries data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itinerariesData = await getAllItineraries();
        setItineraries(itinerariesData);
      } catch (e) {
        console.error("Error while retrieving all itineraries: ", e.message);
      }
    }

    fetchData()
  }, []);

  const handleDayTrackerClick = (itinId) => {
    setIsDayTrackerOpen(true)
    const findItinerary = itineraries.find((itinerary) => itinerary._id === itinId)
    setSelectedItinerary(findItinerary)
    console.log(findItinerary)
  }

  const handleDayTrackerClose = () => {
    setIsDayTrackerOpen(false)
    setSelectedItinerary(null)
  }

  const handleAddItinerary = () => {
    setIsAddingItinerary(true);
  }

  const handleItineraryEdit = (itinId) => {
    console.log(itinId)
    console.log(itineraries)
    const findItinerary = itineraries.find((itinerary) => itinerary._id === itinId)
    setEditedItinerary(findItinerary)
    setIsEditScreenVisible(true)
    console.log("Itinerary clicked:", itinId)
  }

  const handleItineraryDelete = (itinId) => {
    console.log(itinId)
    deleteItinerary(itinId)
    .then((deletedItinerary) => {
        setItineraries((prevItineraries) =>
          prevItineraries.filter((itin) => itin._id !== deletedItinerary._id)
        );
        console.log("Deleted itinerary: ", deletedItinerary);
      })
      .catch((e) => {
        console.error("Error deleting itinerary: ", e.message);
      });
  }

  const handleSavedItinerary = (updatedItin) => {
    updateItinerary(updatedItin)
      .then((updatedItinerary) => {
        const updatedItins = itineraries.map((itin) => 
          itin._id === updatedItin._id ? updatedItinerary : itin
        )
        setItineraries(updatedItins)
        setIsEditScreenVisible(false);
        console.log("Updated itinerary: ", updatedItinerary)
      })
      .catch((e) => {
        console.error("Error when updating the itinerary: ", e.message);
      })
  }

  const handleSaveNewItinerary = (newItin) => {
    const updatedItins = [...itineraries, newItin]
    setItineraries(updatedItins)
    setIsAddingItinerary(false)

    addItinerary(newItin)
      .then((addedItinerary) => {
        console.log("Added itinerary: ", addedItinerary);
      })
      .catch((e) => {
        console.e("Error adding new itinerary: ", e.message);
        const updatedItins = itineraries.filter((itin) => itin !== newItin)
        setItineraries(updatedItins)
        setIsAddingItinerary(false)
      });
  }

  const handleCloseEditScreen = () => {
    setEditedItinerary(null)
    setIsEditScreenVisible(false)
    setIsAddingItinerary(false)
    console.log("Closed editing of itinerary")
  }

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
  }

  const sortItineraries = (itineraries, sortOption) => {
    switch(sortOption) {
      case "date":
        return itineraries.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      case "lastEdited":
        return itineraries.sort((a, b) => new Date(a.lastEdited) - new Date(b.lastEdited));
      case "relevance":
        return itineraries.sort((a, b) => a.id - b.id)
      default:
        return itineraries
    }
  }

  const handleAddButtonHover = () => {
    setIsAddButtonExpanded(true);
  };

  const handleAddButtonLeave = () => {
    setIsAddButtonExpanded(false);
  };

  const name = 'Abhinav Kolli';

  const sortedVals = sortItineraries(itineraries, selectedSortOption);
  console.log(sortedVals)

  const handleSaveOrder = (updatedItinerary) => {
    setSelectedItinerary(updatedItinerary)
    console.log("Updated itinerary", updatedItinerary)
  }

  useEffect(() => {
    document.body.style.overflow = isDayTrackerOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDayTrackerOpen]);

  return (
    <div className="app">
      <div className="header">
        <h1>Bucket List</h1>
      </div>
      <div className="header">
        <h1>Welcome back, {name}</h1>
        <p>Let's finish working on your Paris trip.</p>
      </div>
      Sort by: <SortDropdown onSortChange={handleSortChange}/>
      <div className="tab-list">
        <div className="add-itinerary-outer">
          <div className="add-itinerary-inner">
          {isAddButtonExpanded ? (
            <div className="add-itinerary-expanded"
              onClick={handleAddItinerary}
              onMouseLeave={handleAddButtonLeave}
            >
            </div>
          ) : (
            <div
              className="add-itinerary-button"
              onClick={handleAddItinerary}
              onMouseEnter={handleAddButtonHover}
            >
              +
            </div>
          )}
          </div>
        </div>
        {sortedVals.map((itin) => (
          <ItineraryItem key={itin._id} itin={itin} 
          onItineraryEdit={handleItineraryEdit}
          onItineraryClick={handleDayTrackerClick}
          onItineraryDelete={handleItineraryDelete} />
        ))}
      </div>
      {isEditScreenVisible && (
        <EditItineraryScreen 
          itin={editedItinerary}
          onSavingItin={handleSavedItinerary}
          onClosingEdit={handleCloseEditScreen}
        />
      )}
      {isAddingItinerary && (
        <EditItineraryScreen 
          itin={{}}
          onSavingItin={handleSaveNewItinerary}
          onClosingEdit={handleCloseEditScreen}
        />
      )}
      {isDayTrackerOpen && (
        <DayTrackerScreen 
          itin={selectedItinerary}
          onClose={handleDayTrackerClose}
          dayTrackerOpen={isDayTrackerOpen}
          onSaveOrder={handleSaveOrder}
        />
      )}
    </div>
  );
};

export default App;

