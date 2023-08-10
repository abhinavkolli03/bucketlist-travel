import React from "react"
import { FaLightbulb } from "react-icons/fa"; 

const AddEventButton = ({ onClick }) => {
    return (
        <button onClick={onClick}
        className="flex items-center px-4 py-3 text-lg font-bold text-white bg-purple-200 rounded-lg
        hover:bg-purple-300 transition duration-300">
            <><FaLightbulb className="text-base mr-2"/> Add Activity</>
        </button>
    )
}

export default AddEventButton;