import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Fields.css'; // Import the styles for the SportsFacility page

const BASE_URL = "http://localhost:5000";

function SportsFacility() {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const goToForms = (facilityName) => {
        navigate("/FormsPage", { state: { message: facilityName } });
    };

    const goToHome = () => {
        navigate("/", { state: { message: "Home" } });
    };

    const facilities = [
        { index: 1, name: "Facility 1", capacity: 500, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { index: 2, name: "Facility 2", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { index: 3, name: "Facility 3", capacity: 700, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { index: 4, name: "Facility 4", capacity: 1000, location: "East Campus", type: "Outdoor", equipment: "Stadium" },
        { index: 5, name: "Facility 5", capacity: 450, location: "West Campus", type: "Indoor", equipment: "Gym" }
    ];

    useEffect(() => {
        axios.get(`${BASE_URL}/getDates`)
            .then(response => {
                console.log("Received Hidden Indexes from Backend:", response.data);

                if (Array.isArray(response.data)) {
                    const numericIndexes = response.data
                        .filter(i => i !== null)
                        .map(i => Number(i))
                        .filter(n => !isNaN(n));

                    console.log("Processed Hidden Indexes:", numericIndexes);
                    setHiddenIndexes(numericIndexes);

                    if (numericIndexes.length > 0) {
                        setConflictMessage(`Conflict detected! Facilities with index ${numericIndexes.join(", ")} are unavailable.`);
                    } else {
                        setConflictMessage("No conflicts detected.");
                    }
                } else {
                    console.warn("Unexpected data format from backend:", response.data);
                    setHiddenIndexes([]);
                    setConflictMessage("No conflicts detected.");
                }
            })
            .catch(error => {
                console.error("Error fetching hidden indexes:", error);
                setConflictMessage("Unable to fetch schedule conflicts.");
            });
    }, []);

    const fetchHiddenIndexes = async () => {
        try {
            await axios.post(`${BASE_URL}/addDate`, {
                date: { month: "February", day: 25, year: 2025, startTime: "19:30", endTime: "20:30" }
            });

            const response = await axios.get(`${BASE_URL}/getDates`);
            console.log("Hidden Indexes from Server:", response.data);
            setHiddenIndexes(response.data);
        } catch (error) {
            console.error("Error:", error);
            setConflictMessage("Error adding date or fetching conflicts.");
        }
    };

    return (
        <div className="sports-facility">
            <h1>Welcome to Sports Facility</h1>
            <button className="home-button" onClick={goToHome}>Home</button>

            {conflictMessage && (
                <div className="conflict-message" style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
                    {conflictMessage}
                </div>
            )}

            <p style={{ fontSize: "14px", color: "gray", marginBottom: "10px" }}>
                Hidden Indexes: {hiddenIndexes.length > 0 ? hiddenIndexes.join(", ") : "None"}
            </p>

            <button className="fetch-button" onClick={fetchHiddenIndexes} style={{ marginBottom: "15px", padding: "10px" }}>
                Check Availability
            </button>

            <div className="facility-list">
                {facilities
                    .filter(facility => !hiddenIndexes.includes(facility.index))
                    .map((facility) => (
                        <div key={facility.index} className="facility-box">
                            <div className="facility-details">
                                <span className="facility-name">{facility.name}</span>
                                <span className="facility-capacity">Capacity: {facility.capacity}</span>
                                <span className="facility-location">Location: {facility.location}</span>
                                <span className="facility-type">Type: {facility.type}</span>
                                <span className="facility-equipment">Equipment: {facility.equipment}</span>
                            </div>
                            <button className="form-button" onClick={() => goToForms(facility.name)}>To Form</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SportsFacility;
