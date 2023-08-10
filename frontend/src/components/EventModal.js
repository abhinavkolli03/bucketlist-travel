import React, { useState } from 'react';

const EventModal = ({ selectedLocation, onClose, onSaveEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [allocatedTime, setAllocatedTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [thoughtBubble, setThoughtBubble] = useState('');

  const handleSave = () => {
    const newEvent = {
      name: eventName,
      location: selectedLocation,  // Use the selected location here
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
          placeholder="Event Duration"
          value={eventDuration}
          onChange={(e) => setEventDuration(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Allocated Time"
          value={allocatedTime}
          onChange={(e) => setAllocatedTime(e.target.value)}
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
