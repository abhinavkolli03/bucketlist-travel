import React, {useState} from "react"
import "../styling/dropdown.css"

const SortDropdown = ({ onSortChange }) => {
    const [sortOption, setSortOption] = useState("relevance")
    const handleSortChange = (e) => {
        const value = e.target.value
        setSortOption(value)
        onSortChange(value)
    }
    return (
        <div className="dropdown">
            <select
                className="dropdown-select"
                value={sortOption}
                onChange={handleSortChange}
            >
                <option value="date">Date</option>
                <option value="recents">Recents</option>
                <option value="relevance">Relevance</option>
            </select>
        </div>
    )
}

export default SortDropdown;