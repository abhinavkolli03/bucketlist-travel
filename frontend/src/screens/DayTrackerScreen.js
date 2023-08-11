import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../styling/daytracker.css';
import '../styling/draggable.css';
import '../styling/overlay.css'
import { FaTimes } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import styled from 'styled-components';
import { fetchDayDetails, updateDayOverview } from "../services/dayHandling.js";
import moment from 'moment';
import OverviewModal from '../components/OverviewModal';
import EventModal from '../components/EventModal';

import TimePicker from 'react-time-picker-input';
import EventSearchBox from '../components/EventSearchBox';


const DayTrackerScreen = ({ itin, onClose, dayTrackerOpen, onSaveOrder }) => {
  const days = Object.keys(itin.days);
  const [activeDay, setActiveDay] = useState(days[0]);
  const [dates, setDates] = useState([]);
  const [overviewModalOpen, setOverviewModalOpen] = useState(false);
  const [overviewDescription, setOverviewDescription] = useState("");
  const [overviewLocations, setOverviewLocations] = useState("");
  const [overviewTitle, setOverviewTitle] = useState("");
  
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const [searchPosition, setSearchPosition] = useState("");

  const handleOpenEventModal = (selectedItem) => {
    setSearchPosition(selectedItem)
    setEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setEventModalOpen(false);
  };

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [lastEventTime, setLastEventTime] = useState(startTime)

  const handleStartTimeChange = (newTime) => {
    setStartTime(newTime);
  }

  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
  }

  const handleSaveEvent = (newEvent) => {
    // Handle saving the new event to the itinerary
    console.log("New Event:", newEvent);
  };

  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1000; 
    display: ${props => (props.open ? 'block' : 'none')};
  `;

  const openOverviewModal = () => {
    setOverviewModalOpen(true);
  }

  useEffect(() => {
    const fetchDayDetailsForItinerary = async () => {
      try {
        const days = [];
        for (const dayId of itin.days) {
          const dayDetails = await fetchDayDetails(dayId);
          days.push(dayDetails);
        }
        setDates(days);
        console.log(days)
      } catch (e) {
        console.error("Error fetching day details: ", e.message);
      }
    }
    if (itin.days.length > 0) {
      fetchDayDetailsForItinerary();
    }
  }, [itin])

  useEffect(() => {
    if (activeDay && dates.length > 0) {
      const activeDayDetails = dates[activeDay];
      if (activeDayDetails) {
        setOverviewTitle(activeDayDetails.title);
        setOverviewLocations(activeDayDetails.locations);
        setOverviewDescription(activeDayDetails.description);
      }
    }
  }, [activeDay, dates, days]);

  const DragContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  `

  const handleClose = () => {
    onClose();
  };

  const handleNewDayButtonClick = (day) => {
    setActiveDay(day);
  };

  const handleAddEventButtonClick = () => {

  }

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    //error checks
    if (!destination) return;
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) {
        return;
    }
    const draggedEvent = current_events[source.index]
    const newIndex = destination.index
    const newEventsOrder = Array.from(Object.values(current_events))
    newEventsOrder.splice(source.index, 1)
    newEventsOrder.splice(destination.index, 0, draggedEvent)
    console.log(newEventsOrder)

    const updatedEvents = newEventsOrder.map((event, index) => ({
        ...event,
        order: index,
    }));
    console.log(updatedEvents)
    
    // Update the events for the active day
    const newDays = {
        ...itin.days,
        [activeDay]: {
        ...itin.days[activeDay],
        events: updatedEvents,
        },
    };
    
    console.log(newDays)

    const newItinerary = { ...itin, days: newDays }
    onSaveOrder(newItinerary)
  }

  const current_events = itin.days[activeDay].events || {};
  console.log(current_events);
  const numEvents = Object.values(current_events).length;
  const eventTabWidth = 100 + "%";
  const eventTabHeight = 10 + "%"; // You can adjust this value as needed

  const handleSaveOverview = async (overviewData) => {
    try {
      console.log("Received overview data:", overviewData);
      const activeDayDetails = dates[activeDay];
      if (activeDayDetails) {
        await updateDayOverview(activeDayDetails._id, overviewData.title, overviewData.locations, overviewData.description);
        setDates(prevDates => prevDates.map(day => {
          if (day._id === activeDayDetails._id) {
            return {
              ...day,
              title: overviewData.title,
              locations: overviewData.locations,
              description: overviewData.description
            };
          }
          return day;
        }));
        setOverviewDescription(overviewData.description)
        setOverviewTitle(overviewData.title)
        setOverviewLocations(overviewData.locations)
      } else {
        console.error("Active day details not found.");
      }
      console.log(days)
    } catch (error) {
      console.error("Error saving overview data: ", error.message)
    }
  };
  return (
    <div>
      <div className="day-tracker-screen">
        <div className="day-tracker-header">
          <h1 className="day-tracker-title">{itin.title}</h1>
          <button className="day-tracker-close-button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <div className={`day-tracker-buttons-container`}>
          <button
            className={`day-tracker-button${activeDay === "overview" ? " active" : ""}`}
            onClick={() => handleNewDayButtonClick("overview")}
          >
            Overview
          </button>
          {days.map((day, index) => (
            <button
              key={day}
              className={`day-tracker-button${activeDay === day ? " active" : ""}`}
              onClick={() => handleNewDayButtonClick(day)}
            >
              Day {index + 1}
            </button>
          ))}
        </div>
        <Overlay open={overviewModalOpen}>
          {overviewModalOpen && (
            <OverviewModal 
              currentDescription={overviewDescription}
              currentLocations={overviewLocations}
              currentTitle={overviewTitle}
              onSaveOverview={handleSaveOverview}
              onClose={() => setOverviewModalOpen(false)} 
            />
          )}
        </Overlay>
        <Overlay open={eventModalOpen}>
          {eventModalOpen && (
            <EventModal
              selectedLocation={searchPosition} // Pass the selected location
              onClose={handleCloseEventModal}
              onSaveEvent={handleSaveEvent}
              lastStartTime={lastEventTime}
            />
          )}
        </Overlay>
        <div
          className={`day-tracker-content ${dayTrackerOpen ? 'open' : ''} flex-col justify-between items-center pl-20 pr-10`}
          style={{ marginLeft: 'calc(20% + 1rem)', marginRight: 'calc(10% + 1rem)',
          overflowY: 'scroll',     // Add this line
          maxHeight: 'calc(100vh - 200px)',}}
        >
          {console.log(dates)}
          {activeDay && dates.length > 0 && (
            <div style={{width: "100%"}} className="ml-auto ml-200 mr-10 mt-10">
              <h3 className="font-semibold text-xl mt-10 mb-10">
                {moment(dates[activeDay].date).format("MMMM Do, YYYY")}
              </h3>
              <div className="flex-col items-start overview-section cursor-pointer hover:bg-green-100 transition duration-300 p-4" onClick={openOverviewModal}>
                <h3 className="text-xl font-bold text-left mb-4">{overviewTitle || "Creative Title"}</h3>
                <h5 className="text-sm font-semibold text-left">{overviewLocations || "Where we going?"}</h5>
                <p className="text-gray-600 text-left pt-6">
                  {overviewDescription || "Woah no overview :("}
                </p>
              </div>
            </div>
          )}
          <div className="flex-start space-x-2 mb-10 mt-10">
            <span className="whitespace-nowrap ml-auto text-xl font-bold">Itinerary</span>
          </div>
          <div>
            <EventSearchBox 
              selectPosition={searchPosition} 
              setSelectPosition={setSearchPosition} 
              onOpenEventModal={handleOpenEventModal}
            />
          </div>
          
          <>
            <div className="flex items-center space-x-2 ml-auto mr-10 hover:bg-green-100 transition duration-300 p-4">
              <span className="whitespace-nowrap">Start Time:</span>
              <TimePicker
                className="opacity-0 cursor-pointer absolute inset-0 w-full h-full rounded-lg"
                value={startTime}
                hour12Format={true}
                onChange={handleStartTimeChange}
              />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="itinerary">
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`draggable-event-list-container ${
                        snapshot.isDraggingOver ? 'dragging' : ''
                      }`}
                      innerRef={provided.innerRef}
                    >
                      {Object.values(current_events).length === 0 ? (
                        <h3 className="text-sm text-center mt-6">Kinda empty :/ Let's add some events!</h3>
                      ) : (Object.values(current_events).map((event, index) => {
                        const {name, keyword, startTime, endTime, description } = event;
                        const keywordColor = keyword === 'Breakfast' || keyword === 'Lunch' || keyword === 'Dinner'
                            ? 'lightgreen' : 'orange';
                        return (
                          <Draggable
                            key={event.id}
                            draggableId={event.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div style={{width: eventTabWidth, height: eventTabHeight}}>
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="draggable-event-item"
                                  >
                                    <div className="draggable-event-content" style={{width: eventTabWidth, height: eventTabHeight, backgroundColor: keywordColor}}>
                                      <h2>{event.name}</h2>
                                      <h4>{event.keyword}</h4>
                                      <p>{event.description}</p>
                                      <div className="event-time">     
                                        <span className="calendar-icon"><FaCalendar/></span>
                                        <span>{startTime} - {endTime}</span>
                                      </div>
                                      <div>
                                        <label>Duration:</label>
                                        <input
                                          type="text"
                                          value={event.duration || ''}
                                          onChange={(e) => {
                                            const newEvents = { ...current_events };
                                            newEvents[event.id] = {
                                              ...event,
                                              duration: e.target.value,
                                            };
                                            const newDays = {
                                              ...itin.days,
                                              [activeDay]: {
                                                ...itin.days[activeDay],
                                                events: newEvents,
                                              },
                                            };
                                            onSaveOrder({ ...itin, days: newDays });
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="draggable-event-image-container" style={{backgroundColor: keywordColor}}>
                                      <img
                                        src={event.image ? require("../test-images/" + event.image) : require("../test-images/placeholder.jpg")}
                                        alt={event.name}
                                        className="draggable-event-image"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })
                    )}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
            <div className="flex items-center space-x-2 ml-auto mr-10 hover:bg-green-100 transition duration-300 p-4">
              <span className="whitespace-nowrap">End Time:</span>
              <TimePicker
                className="opacity-0 cursor-pointer absolute inset-0 w-full h-full rounded-lg"
                value={endTime}
                hour12Format={true}
                onChange={handleEndTimeChange}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
  
};

export default DayTrackerScreen;