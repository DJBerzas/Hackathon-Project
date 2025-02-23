import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; // Only import this for the Home page

function Home() {
    const navigate = useNavigate();

    const goToFacility = () => navigate("/Facility");
    const goToHealthProfessional = () => navigate("/HealthProfessional");
    const goToSeeEvent = () => navigate("/Events");
    const gtform = () => navigate("/FormsPage");


  

    return (
        <div className='home-page'>
            
            <div className = 'home-container'>

            <h1 className='home-title'>Welcome to Home Page</h1>
                <button onClick={goToFacility} className="nav-button">See Facilities</button>
                <button onClick={goToHealthProfessional}className="nav-button">See Healthcare Professionals</button>
                <button onClick={goToSeeEvent}className="nav-button">See Events</button>
                <button onClick={gtform}className="nav-button">TestForm</button>
        
            </div>
        </div>
    );
}

export default Home;
