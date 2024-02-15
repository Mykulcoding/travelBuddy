import React from "react";
import "./Weather.css";
import Weather from './weather';


const Weatherforecast = () => {
    return (
        <div className="container Weather text-center ">
            <h1>Weather</h1>
            <Weather />
            
        </div>
    )
}

export default Weatherforecast;