import React, { useEffect, useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css'
import moment from 'moment';

const EventModal = ({ selectedLocation, onClose, onSaveEvent, lastStartTime }) => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState(selectedLocation.address.road + ", " + 
  selectedLocation.address.city + ", " + 
  selectedLocation.address.state + " " + 
  selectedLocation.address.postcode)  
  const [eventDuration, setEventDuration] = useState("1");
  const [eventDescription, setEventDescription] = useState('');
  const [thoughtBubble, setThoughtBubble] = useState('');
  
  const [startTime, setStartTime] = useState(moment(lastStartTime, 'HH:mm'));


  const [endTime, setEndTime] = useState(moment(lastStartTime, 'HH:mm'));

  const calculateDuration = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(parseFloat);
    const [endHour, endMinute] = end.split(':').map(parseFloat);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    const durationHours = durationMinutes / 60;
    return durationHours; 
  }

  const handleTimeChanges = (newTime, setTimeFunction) => {
    console.log(newTime)
    const formattedTime = moment(newTime, 'HH:mm');
    setTimeFunction(formattedTime);
  }

  useEffect(() => {
    console.log(startTime)
    console.log(endTime)
  }, [startTime, endTime])

  const handleSave = () => {
    const newEvent = {
      name: eventName,
      location: eventLocation,
      startTime: startTime,
      endTime: endTime,
      allocatedHours: eventDuration,
      description: eventDescription,
      thoughtBubble: thoughtBubble,
    };

    onSaveEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Event Address"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <div className="flex mb-2 space-x-4">
            <div>
                <label>Start Time:</label>
                <TimePicker
                value={startTime}
                use12Hours={true}
                showSecond={false}
                onChange={(newTime) => handleTimeChanges(newTime, setStartTime)}
                />
            </div>
            <div>
                <label>End Time:</label>
                <TimePicker
                value={endTime}
                use12Hours={true}
                showSecond={false}
                onChange={(newTime) => handleTimeChanges(newTime, setEndTime)}
                />
            </div>
        </div>
        <input
          type="text"
          placeholder="Allocated Hours"
          value={eventDuration}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event Description"
          rows={4}
        />
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring mt-2"
          value={thoughtBubble}
          onChange={(e) => setThoughtBubble(e.target.value)}
          placeholder="Thoughts on the experience"
          rows={4}
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
        >
          Save Event
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventModal;
