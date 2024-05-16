import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/popup.css";

const Popup = (props) => {

    const navigate = useNavigate();
    const goToCountry = () => {
        navigate(`/${props.country}`);
    }

    const closePopUp = () => {
        props.closePopup();
    }






    return (
        <div className="popup-box">
            <h1 className = "title">{props.country} ?</h1>
            <div className="buttons">
                <button className="correctBtn" onClick={goToCountry}>Da</button>
                <button className="wrongBtn" onClick={closePopUp}>Nu</button>
            </div>
        </div>
    );
}

export default Popup;