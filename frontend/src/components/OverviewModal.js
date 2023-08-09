import React, { useState } from 'react';

const OverviewModal = ({ currentDescription, currentTitle, currentLocations, onClose, onSaveOverview }) => {
    const [overviewTitle, setOverviewTitle] = useState(currentTitle);
    const [overviewLocations, setOverviewLocations] = useState(currentLocations);
    const [overviewDescription, setOverviewDescription] = useState(currentDescription);

    const handleTitleChange = (event) => {
        setOverviewTitle(event.target.value);
    };

    const handleLocationChange = (event) => {
        setOverviewLocations(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setOverviewDescription(event.target.value);
    };

    const handleSave = () => {
        // Handle saving the overview data
        const overviewData = {
            title: overviewTitle,
            locations: overviewLocations,
            description: overviewDescription,
        };

        onSaveOverview(overviewData)
        
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Overview of Day</h2>
                <input
                    type="text"
                    placeholder="Overview Title"
                    value={overviewTitle}
                    onChange={handleTitleChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Overview Locations"
                    value={overviewLocations}
                    onChange={handleLocationChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                    value={overviewDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Click here to add an overview"
                    rows={4}
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
        //     <input
        //         type="text"
        //         placeholder="Overview Title"
        //         value={overviewTitle}
        //         onChange={(e) => setOverviewTitle(e.target.value)}
        //     />
        //     <input
        //         type="text"
        //         placeholder="Overview Locations"
        //         value={overviewLocations}
        //         onChange={(e) => setOverviewLocations(e.target.value)}
        //     />
        //     <textarea
        //         placeholder="Overview Description"
        //         value={overviewDescription}
        //         onChange={(e) => setOverviewDescription(e.target.value)}
        //     />
        //     <button onClick={handleSave}>Save</button>
        //     <button onClick={onClose}>Cancel</button>
        // </div>
    );
};

export default OverviewModal;
