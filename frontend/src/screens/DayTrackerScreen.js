import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../styling/daytracker.css';
import '../styling/draggable.css';
import { FaTimes } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import styled from 'styled-components';

const DayTrackerScreen = ({ itin, onClose, dayTrackerOpen, onSaveOrder }) => {
  const days = Object.keys(itin.days);
  const [activeDay, setActiveDay] = useState(days[0]);

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
          {days.map((day) => (
            <button
              key={day}
              className={`day-tracker-button${activeDay === day ? " active" : ""}`}
              onClick={() => handleNewDayButtonClick(day)}
            >
              Day {day.substring(3)}
            </button>
          ))}
        </div>
        <div className={`day-tracker-content ${dayTrackerOpen ? 'open' : ''}`}>
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
                    {Object.values(current_events).map((event, index) => {
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
                                       
                                        <div className="draggable-event-content"
                                         style={{width: eventTabWidth, height: eventTabHeight, backgroundColor: keywordColor}}>
                                            <h2>{event.name}</h2>
                                            <h4>{event.keyword}</h4>
                                            <p>{event.description}</p>
                                            <div className="event-time">     
                                                <span className="calendar-icon">   <FaCalendar/></span>
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
                                                    // Update the event duration
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
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default DayTrackerScreen;
