import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Change this if your backend is deployed elsewhere

const SportsFacility = () => {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const facilities = [
        { index: 1, name: "Building 1", capacity: 500, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { index: 2, name: "Building 2", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { index: 3, name: "Building 3", capacity: 700, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { index: 4, name: "Building 4", capacity: 1000, location: "East Campus", type: "Outdoor", equipment: "Stadium" },
        { index: 5, name: "Building 5", capacity: 450, location: "West Campus", type: "Indoor", equipment: "Gym" },
        { index: 6, name: "Building 6", capacity: 850, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool, Sauna" },
        { index: 7, name: "Building 7", capacity: 400, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { index: 8, name: "Building 8", capacity: 1200, location: "East Campus", type: "Indoor", equipment: "Sports Complex" },
        { index: 9, name: "Building 9", capacity: 600, location: "South Campus", type: "Outdoor", equipment: "Field" },
        { index: 10, name: "Building 10", capacity: 950, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" }
    ];

    // Fetch hidden indexes when component loads
    useEffect(() => {
        axios.get(`${BASE_URL}/getDates`)
            .then(response => {
                console.log(" Raw Hidden Indexes Response:", response.data);

                if (Array.isArray(response.data)) {
                    const numericIndexes = response.data.map(index => parseInt(index, 10)).filter(n => !isNaN(n));
                    console.log("Processed Hidden Indexes:", numericIndexes);

                    setHiddenIndexes(numericIndexes);

                    if (numericIndexes.length > 0) {
                        setConflictMessage(` Conflict detected! Facilities with index ${numericIndexes.join(", ")} are unavailable.`);
                    } else {
                        setConflictMessage(" No conflicts detected.");
                    }
                } else {
                    console.warn(" Unexpected data format from backend:", response.data);
                    setHiddenIndexes([]);
                    setConflictMessage(" No conflicts detected.");
                }
            })
            .catch(error => {
                console.error("Error fetching hidden indexes:", error);
                setConflictMessage(" Unable to fetch schedule conflicts.");
            });
    }, []);

    // Function to add a test date and fetch hidden indexes
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
            setConflictMessage(" Error adding date or fetching conflicts.");
        }
    };

    return (
        <div className="sports-facility">
            <h1>Welcome to Sports Facility</h1>
            <button className="home-button" onClick={() => navigate("/")}>Home</button>

            {/* {conflictMessage && (
                <div className="conflict-message" style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
                    {conflictMessage}
                </div>
            )}

            Display hidden/conflict indexes
            <p style={{ fontSize: "14px", color: "gray", marginBottom: "10px" }}>
                Hidden Indexes: {hiddenIndexes.length > 0 ? hiddenIndexes.join(", ") : "None"}
            </p> */}

            <button className="fetch-button" onClick={fetchHiddenIndexes} style={{ marginBottom: "15px", padding: "10px" }}>
                🔄 Check Availability
            </button>

            <div className="facility-list">
                {facilities
                    .filter(facility => !hiddenIndexes.includes(facility.index))
                    .map(facility => (
                        <div key={facility.index} className="facility-box">
                            <div className="facility-details">
                                <span className="facility-name">{facility.name}</span>
                                <span className="facility-capacity">Capacity: {facility.capacity}</span>
                                <span className="facility-location">Location: {facility.location}</span>
                                <span className="facility-type">Type: {facility.type}</span>
                                <span className="facility-equipment">Equipment: {facility.equipment}</span>
                            </div>
                            <button className="form-button" onClick={() => navigate("/FormsPage", { state: { message: facility.name } })}>
                                To Form
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SportsFacility;
