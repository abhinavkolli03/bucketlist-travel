import React, { useState, useEffect } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { FaBullseye } from "react-icons/fa";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
  limit: 8, // Limit the number of search results
};

const EventSearchBox = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [activateResults, setActivateResults] = useState(false)

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
        if (searchText) {
            performSearch();
            setActivateResults(true)
        }
    }, 1500); // Adjust the delay as needed

    setSearchTimeout(newTimeout);

    return () => {
        if (newTimeout) {
            clearTimeout(newTimeout);
        }
    };
  }, [searchText]);

  useEffect(() => {
    if (!searchText) {
        setListPlace([]);
        setActivateResults(FaBullseye)
        return;
    } 
  }, [searchText])

  const performSearch = () => {
    const queryParams = new URLSearchParams({
      ...params,
      q: searchText,
    });

    fetch(`${NOMINATIM_BASE_URL}${queryParams}`)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", minWidth: "40vh"}}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ borderRightWidth: "0px", borderRadius: 20, minWidth: "50vh", 
            borderTopRightRadius: "40px", borderBottomRightRadius: "40px",
            borderRadius: "40px" }} // Rounded input
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px", 
            borderTopRightRadius: "40px", borderBottomRightRadius: "40px", backgroundColor: "#8e649b", marginLeft: "-111px", opacity: "1"}}>
          <Button color="primary" onClick={() => {
            if (searchText) {
                performSearch();
            }
          }} style={{ borderRadius: 20, color: "black" }}>
            Search
          </Button>
        </div>
      </div>
      <div
        style={{
            overflowY: listPlace.length > 0 ? "scroll" : "hidden", 
            maxHeight: "150px", // Limit the height to show 3 items
            marginTop: "10px",
            borderRadius: "10px",
        }}
      >
        {activateResults && <List component="nav" aria-label="main mailbox folders">
            {listPlace.map((item) => (
                <div key={item?.place_id}>
                    <ListItem
                        button
                        onClick={() => {
                            setSelectPosition(item);
                            props.onOpenEventModal(item);
                        }}
                        style={{
                            width: "50vh"
                        }}
                        >
                        <ListItemIcon>
                            <img
                            src={require("../test-images/placeholder.jpg")}
                            alt="Placeholder"
                            style={{ width: 38, height: 38 }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={item?.display_name}
                            secondary={item?.address?.city || item?.address?.state || item?.address?.country}
                        />
                    </ListItem>
                <Divider />
                </div>
            ))}
        </List>}
      </div>
    </div>
  );
};

export default EventSearchBox;
