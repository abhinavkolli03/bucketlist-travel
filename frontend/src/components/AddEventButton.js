import React from "react"
import styled from 'styled-components'
import { FaLightbulb } from "react-icons/fa"; 

const StyledAddEventButton = styled.button`
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const AddEventButton = ({ onClick }) => {
    return (
        <StyledAddEventButton onClick={onClick}>
            <FaLightbulb style={{fontSize: 12}}/> Add Activity
        </StyledAddEventButton>
    )
}

export default AddEventButton;