import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Fields.css';

const BASE_URL = "http://localhost:5000"; // Change this if backend is deployed elsewhere

function Buildings() {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const goToHome = () => {
        navigate("/", { state: { message: "Building" } });
    };

    const goToRooms = () => {
        navigate("/Rooms", { state: { message: "Building" } });
    };

    const goToForms = (buildingName) => {
        navigate("/BuildingForm", { state: { message: buildingName } });
    };

    const buildings = [
        { index: 1, name: "Building 1", capacity: 500, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { index: 2, name: "Building 2", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { index: 3, name: "Building 3", capacity: 700, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { index: 4, name: "Building 4", capacity: 1000, location: "East Campus", type: "Outdoor", equipment: "Stadium" },
        { index: 5, name: "Building 5", capacity: 450, location: "West Campus", type: "Indoor", equipment: "Gym" },
        { index: 6, name: "Building 6", capacity: 850, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool, Sauna" },
        { index: 7, name: "Building 7", capacity: 400, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { index: 8, name: "Building 8", capacity: 1200, location: "East Campus", type: "Indoor", equipment: "Sports Complex" },
        { index: 9, name: "Building 9", capacity: 600, location: "South Campus", type: "Outdoor", equipment: "Field" },
        { index: 10, name: "Building 10", capacity: 950, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { index: 11, name: "Building 11", capacity: 550, location: "West Campus", type: "Indoor", equipment: "Gym, Sauna" },
        { index: 12, name: "Building 12", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { index: 13, name: "Building 13", capacity: 800, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { index: 14, name: "Building 14", capacity: 1100, location: "East Campus", type: "Indoor", equipment: "Sports Complex, Sauna" },
        { index: 15, name: "Building 15", capacity: 650, location: "Main Campus", type: "Outdoor", equipment: "Track, Field" },
        { index: 16, name: "Building 16", capacity: 1200, location: "West Campus", type: "Indoor", equipment: "Gym, Pool" },
        { index: 17, name: "Building 17", capacity: 450, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { index: 18, name: "Building 18", capacity: 500, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { index: 19, name: "Building 19", capacity: 750, location: "Main Campus", type: "Outdoor", equipment: "Stadium" },
        { index: 20, name: "Building 20", capacity: 900, location: "East Campus", type: "Indoor", equipment: "Gym, Pool" }
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
                        setConflictMessage(`Conflict detected! Buildings with index ${numericIndexes.join(", ")} are unavailable.`);
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
        <div className="building-container">
            <div className="building-page">
                <h1>Welcome to the Buildings Page</h1>
                <div className="button-container">
                    <button className="home-button" onClick={goToHome}>Home</button>
                    <button className="home-button" onClick={goToRooms}>Rooms</button>
                </div>

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
                    {buildings
                        .filter(building => !hiddenIndexes.includes(building.index))
                        .map((building) => (
                            <div key={building.index} className="facility-box">
                                <div className="facility-details">
                                    <span className="facility-name">{building.name}</span>
                                    <span className="facility-capacity">Capacity: {building.capacity}</span>
                                    <span className="facility-location">Location: {building.location}</span>
                                    <span className="facility-type">Type: {building.type}</span>
                                    <span className="facility-equipment">Equipment: {building.equipment}</span>
                                </div>
                                <button className="form-button" onClick={() => goToForms(building.name)}>To Form</button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Buildings;
