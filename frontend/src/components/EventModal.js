import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker-input';

const EventModal = ({ selectedLocation, onClose, onSaveEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState(selectedLocation.address.road + ", " + 
  selectedLocation.address.city + ", " + 
  selectedLocation.address.state + " " + 
  selectedLocation.address.postcode)
  const [eventDuration, setEventDuration] = useState("1");
  const [allocatedTime, setAllocatedTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [thoughtBubble, setThoughtBubble] = useState('');
  
  const calculateEventDuration = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(parseFloat);
    const [endHour, endMinute] = end.split(':').map(parseFloat);
  
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
  
    const durationMinutes = endTotalMinutes - startTotalMinutes;
  
    const durationHours = durationMinutes / 60;
  
    return durationHours; 
  };

  const calculateEndTime = (start, duration) => {
    const durationHours = parseFloat(duration);
    const [startHour, startMinute] = start.split(':').map(parseFloat);
  
    let endHour = startHour + Math.floor(durationHours);
    let endMinute = startMinute + (durationHours % 1) * 60;
  
    if (endMinute >= 60) {
      endHour += Math.floor(endMinute / 60);
      endMinute %= 60;
    }
  
    return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
  };

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState(calculateEndTime(startTime, eventDuration));

  useEffect(() => {
    setEndTime(calculateEndTime(startTime, eventDuration))
    setEventDuration(calculateEventDuration(startTime, endTime))
  }, [eventDuration])

  const handleStartTimeChange = (newTime) => {
    setStartTime(newTime);
    const newTimeStr = newTime.getHours() + ':' + newTime.getMinutes();
    // Calculate and update the end time based on the duration
    const newEndTime = calculateEndTime(newTimeStr, eventDuration);
    setEndTime(newEndTime);
  };  

  const handleDurationChange = (newDuration) => {
    setEventDuration(newDuration);
    const newEndTime = calculateEndTime(startTime, newDuration);
    setEndTime(newEndTime);
  };

  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
    // Calculate and update the duration based on the end time
    const newTimeStr = newTime.getHours() + ':' + newTime.getMinutes();
    const newDuration = calculateEventDuration(startTime, newTimeStr);
    setEventDuration(newDuration);
  };

  const handleSave = () => {
    const newEvent = {
      name: eventName,
      location: eventLocation,
      startTime: startTime,
      endTime: endTime,
      duration: eventDuration,
      allocatedTime: allocatedTime,
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
          onChange={(e) => setEventDuration(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <div className="flex mb-2 space-x-4">
          <div>
            <label>Start Time:</label>
            <TimePicker
              value={startTime}
              hour12Format={true}
              onChange={handleStartTimeChange}
            />
          </div>
          <div>
            <label>End Time:</label>
            <TimePicker
              value={endTime}
              hour12Format={true}
              onChange={handleEndTimeChange}
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Event Duration (in hours)"
          value={eventDuration}
          onChange={(e) => handleDurationChange(e.target.value)}
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
