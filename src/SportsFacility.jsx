import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Fields.css';

function SportsFacility() {
    const navigate = useNavigate();
    const [excludedIndexes, setExcludedIndexes] = useState([]);

    useEffect(() => {
        // Fetch the excluded indexes from backend
        axios.get("http://localhost:5000/getSportsFacilityTimes")
            .then(response => {
                setExcludedIndexes(response.data); // Store response in state
            })
            .catch(error => {
                console.error("Error fetching excluded indexes:", error);
            });
    }, []); // Runs only on component mount

    const goToForms = (facilityName) => {
        navigate("/FormsPage", { state: { message: facilityName } });
    };

    const goToHome = () => {
        navigate("/", { state: { message: "Home" } });
    };

    const facilities = [
        { name: "Building 1", capacity: 500, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Building 2", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Building 3", capacity: 700, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Building 4", capacity: 1000, location: "East Campus", type: "Outdoor", equipment: "Stadium" },
        { name: "Building 5", capacity: 450, location: "West Campus", type: "Indoor", equipment: "Gym" },
        { name: "Building 6", capacity: 850, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool, Sauna" },
        { name: "Building 7", capacity: 400, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { name: "Building 8", capacity: 1200, location: "East Campus", type: "Indoor", equipment: "Sports Complex" },
        { name: "Building 9", capacity: 600, location: "South Campus", type: "Outdoor", equipment: "Field" },
        { name: "Building 10", capacity: 950, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" }
    ];

    return (
        <div className="sports-facility">
            <h1>Welcome to Sports Facility</h1>
            <button className="home-button" onClick={goToHome}>Home</button>

            <div className="facility-list">
                {facilities
                    .map((facility, index) => 
                        !excludedIndexes.includes(index) && (
                            <div key={index} className="facility-box">
                                <div className="facility-details">
                                    <span className="facility-name">{facility.name}</span>
                                    <span className="facility-capacity">Capacity: {facility.capacity}</span>
                                    <span className="facility-location">Location: {facility.location}</span>
                                    <span className="facility-type">Type: {facility.type}</span>
                                    <span className="facility-equipment">Equipment: {facility.equipment}</span>
                                </div>
                                <button className="form-button" onClick={() => goToForms(facility.name)}>To Form</button>
                            </div>
                        )
                    )}
            </div>
        </div>
    );
}

export default SportsFacility;
