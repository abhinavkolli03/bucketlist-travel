import React, { useState, useEffect, useRef } from "react";
import "../styling/itineraryedit.css"
import placeholderImage from "../test-images/placeholder.jpg"
import moment from "moment"

const EditItineraryScreen = ({ itin, onSavingItin, onClosingEdit }) => {
    //we will need to update more metadata here later on if we want more on the screen
    const [imageFile, setImageFile] = useState("placeholder.jpg")
    const [imageChecker, setImageChecker] = useState(true)
    const [title, setTitle] = useState("")
    const [durationValue, setDurationValue] = useState(null);
    const [durationUnit, setDurationUnit] = useState("");
    const [maxValueForUnit, setMaxValueForUnit] = useState("365");
    const [description, setDescription] = useState("")
    const [thoughtBubble, setThoughtBubble] = useState("")

    const [startDate, setStartDate] = useState("");


    //word count
    const [descriptionWordCount, setDescriptionWordCount] = useState(0);
    const DESCRIPTION_MAX = 250;

    //ref for resizing textarea and miscellaneous
    const descriptionAreaRef = useRef(null); 
    const thoughBubbleAreaRef = useRef(null); 
    const [addPlural, setAddPlural] = useState("")
    const [addingNewItin, setAddingNewItin] = useState(false)

    //errors states
    const [titleError, setTitleError] = useState("");
    const [durationError, setDurationError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [isInitialized, setIsInitialized] = useState(false)
    const [timeInitialized, setTimeInitialized] = useState(false)
    const [startDateError, setStartDateError] = useState(false)

    //update content with useEffect if itin exists
    useEffect(() => {
        if (itin && itin.title) {
            if(!timeInitialized) {
                console.log(itin)
                setTitle(itin.title);
                const durationParts = itin.duration.split(" ")
                setDurationValue(parseInt(durationParts[0]))
                setDurationUnit(durationParts[1])
                setDescription(itin.description);
                setThoughtBubble(itin.thoughtBubble);
                setImageFile(itin.image);
                setStartDate(itin.startDate)
            }
            setIsInitialized(true);
            setTimeInitialized(true);
        } else {
            setAddingNewItin(true);
            if (!title) {
                setTitleError("Please enter a title for the itinerary");
            }
            if (!durationValue || !durationUnit) {
                setDurationError("Please enter a proper duration for your itinerary")
            }
            if (!description) {
                setDescriptionError("Please enter a description about the itinerary");
            }
        }
    }, [itin, durationValue, durationUnit, description, title, timeInitialized]);

    //setting word count
    useEffect(() => {
        const value = checkWords(description);
        setDescriptionWordCount(value)
        if (value <= 0) {
            setDescriptionError("Please enter a description about the itinerary")
        } else {
            setDescriptionError("")
        }
    }, [description])

    //setting error states
    useEffect(() => {
        console.log(durationValue, durationUnit)
        console.log(durationValue)
        console.log(durationValue === null)
        console.log(durationValue === "")
        console.log(durationUnit === "")
        if (durationUnit === "" || durationValue === "" || durationValue === null) {
            console.log("worked")
            setDurationError("Please enter a proper duration for your itinerary")
        } else {
            setDurationError("")
        }
    }, [durationUnit, durationValue])

    useEffect(() => {
        if (isInitialized && title.trim() === "") {
            setTitleError("Please enter a title for the itinerary");
        }
    }, [isInitialized, title])

    useEffect(() => {
        if (isInitialized) {
            const pieces = startDate.split("-")
            if (parseInt(pieces[0], 10) > 2100 || parseInt(pieces[0], 10) < 2000) {
                setStartDateError("Please enter a proper start date for your itinerary")
            }
        }
    }, [isInitialized, startDate])

    useEffect(() => {
        if(durationValue > 1) {
            setAddPlural("s")
        } else {
            setAddPlural("")
        }
    }, [durationValue])

    //handling unit changes
    useEffect(() => {
        setMaxValueForUnit(getMaxValueForUnit(durationUnit))
        if (durationValue > getMaxValueForUnit(durationUnit)) {
            setMaxValueForUnit(getMaxValueForUnit(durationUnit));
        }
    }, [durationValue, durationUnit])

    //handling ref resizing of textareas
    useEffect(() => {
        if (descriptionAreaRef.current) {
            descriptionAreaRef.current.style.height = "auto";
            descriptionAreaRef.current.style.height = `${descriptionAreaRef.current.scrollHeight}px`;
        }
    }, [description])

    useEffect(() => {
        if (thoughBubbleAreaRef.current) {
            thoughBubbleAreaRef.current.style.height = "auto";
            thoughBubbleAreaRef.current.style.height = `${thoughBubbleAreaRef.current.scrollHeight}px`;
        }
    }, [thoughtBubble])

    //handle closing of itinerary
    const handleItinClose = () => {
        if (addingNewItin) {
            onClosingEdit();
        } else {
            onSavingItin(itin);
            onClosingEdit();
        }
    };
      

    //creating new saved itinerary and storing data back in passed function
    const handleItinSave = () => {
        if (!imageChecker || titleError || durationError || descriptionError || startDateError) {
            return;
        }

        const durationInDays = durationValue * getUnitMultiplier(durationUnit);

        console.log(durationInDays)
        
        const startDateObj = moment(startDate, "YYYY-MM-DD").startOf("day");

        console.log(startDateObj)

        let endDateObj = startDateObj.clone().add(durationInDays - 1, "days")

        if (durationUnit === "Hours") {
            endDateObj = startDateObj.clone().add(durationInDays, "days")
        }

        console.log(endDateObj)


        console.log(itin)
        let newItin;
        if (itin) {
            newItin = {
                ...itin,
                title: title,
                duration: durationValue + " " + durationUnit,
                description: description,
                thoughtBubble: thoughtBubble,
                image: imageFile || itin.image,
                startDate: startDateObj.format("YYYY-MM-DD"),
                endDate: endDateObj.format("YYYY-MM-DD"),
            };
        } else {
            newItin = {
                id: Date.now(),
                title: title,
                duration: durationValue + " " + durationUnit,
                description: description,
                thoughtBubble: thoughtBubble,
                image: imageFile,
                startDate: startDateObj.format("MM/DD/YYYY"),
                endDate: endDateObj.format("MM/DD/YYYY"),
            };
        }

        console.log(newItin)

        onSavingItin(newItin)
        onClosingEdit()
        setIsInitialized(false)
    }

    //all the editing features for handling textarea changes
    //and saving it to their respective const

    const handleImageChange = (e) => {
        const newImage = e.target.value.trim();
        setImageFile(newImage)
        const imageExists = isValidImage(newImage)
        setImageChecker(imageExists)
    }

    const isValidImage = (newImage) => {
        try {
            const images = require.context('../test-images', false, /\.(png|jpe?g|gif|svg)$/);
            const imageExists = images.keys().some((key) => key === `./${newImage}`);
            return imageExists;
        } catch (error) {
            return false;
        }
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setStartDateError("");
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        setTitleError("");
    }

    const handleDurationValueChange = (e) => {
        setDurationValue(e.target.value);
    };
    
    const handleDurationUnitChange = (e) => {
        setDurationUnit(e.target.value);
    };

    const getMaxValueForUnit = (unit) => {
        switch (unit) {
        case "Hours":
            return 24;
        case "Days":
            return 365;
        case "Weeks":
            return 52;
        default:
            return 0;
        }
    }; 
    
    const getUnitMultiplier = (unit) => {
        switch (unit) {
            case "Hours":
                return 1 / 24; 
            case "Days":
                return 1;
            case "Weeks":
                return 7;
            default:
                return 0;
        }
    };
    

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        const wordCount = checkWords(value)
        if (wordCount <= DESCRIPTION_MAX) {
            setDescription(value)
            setDescriptionWordCount(wordCount);
        } else {
            setDescription(value.split(" ").slice(0, DESCRIPTION_MAX).join(" "))
        }
    }

    const checkWords = (text) => {
        const words = text.trim().split(/\s+/)
        if (words.length === 1 && words[0] === "") {
            return 0
        }
        return words.length;
    }

    const handleThoughtBubbleChange = (e) => {
        setThoughtBubble(e.target.value)
    }

    return (
        <div className="edit-itin-screen p-6 bg-white rounded-lg shadow-md w-96">
            <div className="edit-itin-header">
                <img className="edit-itin-screen-image"
                    src={itin && itin.image ? require("../test-images/" + itin.image) : placeholderImage}
                    alt={itin && itin.title}
                />            
            </div>
            <div className="edit-itin-screen-content">
                <div>
                    <input
                        className="edit-itin-screen-input"
                        type="text"
                        value={imageFile}
                        onChange={handleImageChange}
                        placeholder="Image URL"
                    />
                    {!imageChecker && <p className="error-message">Invalid image name</p>}
                </div>
                <div>
                    <input 
                        className="edit-itin-screen-input"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Itinerary Title"
                    />
                    {titleError && <p className="error-message">{titleError}</p>}
                </div>
                <input
                    className="edit-itin-screen-input"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    placeholder="Start Date"
                />
                {startDateError && <p className="error-message">{startDateError}</p>}
                <div className="duration-input-container">
                    <input
                        className="edit-itin-screen-input duration-value-input"
                        type="number"
                        min="1"
                        max={maxValueForUnit}
                        value={parseInt(durationValue, 10)}
                        onChange={handleDurationValueChange}
                        placeholder="Duration"
                    />
                    <select
                        className="edit-itin-screen-input duration-unit-select"
                        value={durationUnit}
                        onChange={handleDurationUnitChange}
                    >
                        <option value="">None</option>
                        <option value="Hours">Hour{addPlural}</option>
                        <option value="Days">Day{addPlural}</option>
                        <option value="Weeks">Week{addPlural}</option>
                    </select>
                </div>
                {durationError && <p className="error-message">{durationError}</p>}
                <div>
                    <textarea 
                        ref={descriptionAreaRef}
                        className="edit-itin-screen-input"
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                    />
                    <p className={descriptionWordCount > DESCRIPTION_MAX ? "word-count-exceeded" : ""}>
                        {descriptionWordCount}/{DESCRIPTION_MAX} words
                    </p>
                    {descriptionError && <p className="error-message">{descriptionError}</p>}
                </div>
                <textarea 
                    ref={thoughBubbleAreaRef}
                    className="edit-itin-screen-input"
                    type="text"
                    value={thoughtBubble}
                    onChange={handleThoughtBubbleChange}
                    placeholder="Thought Bubble"
                />
            </div>            
            <div className="edit-itin-footer mt-4 flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2" onClick={handleItinSave}>
                    Save
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded" onClick={handleItinClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default EditItineraryScreen