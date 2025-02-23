import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Training.css';

const BASE_URL = "http://localhost:5000"; // Change this if backend is deployed elsewhere

function Training() {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const goToForms = (roomName) => {
        navigate("/TrainingRoomForm", { state: { message: roomName } });
    };

    const goToHome = () => {
        navigate("/", { state: { message: "Home" } });
    };

    const trainingRooms = [
        { index: 1, name: "Training Room 1", capacity: 20, location: "Main Campus", type: "Indoor", equipment: "Treadmills, Weights" },
        { index: 2, name: "Training Room 2", capacity: 15, location: "North Campus", type: "Indoor", equipment: "Stationary Bikes, Weights" },
        { index: 3, name: "Training Room 3", capacity: 30, location: "South Campus", type: "Indoor", equipment: "Free Weights, Machines" },
        { index: 4, name: "Training Room 4", capacity: 25, location: "East Campus", type: "Indoor", equipment: "Cardio Machines, Weights" },
        { index: 5, name: "Training Room 5", capacity: 20, location: "West Campus", type: "Indoor", equipment: "Stretching Area, Free Weights" },
        { index: 6, name: "Training Room 6", capacity: 40, location: "Main Campus", type: "Indoor", equipment: "Full Gym Equipment" },
        { index: 7, name: "Training Room 7", capacity: 10, location: "North Campus", type: "Indoor", equipment: "Yoga Mats, Weights" },
        { index: 8, name: "Training Room 8", capacity: 50, location: "East Campus", type: "Indoor", equipment: "CrossFit Equipment" },
        { index: 9, name: "Training Room 9", capacity: 35, location: "South Campus", type: "Indoor", equipment: "Cardio Machines, Free Weights" },
        { index: 10, name: "Training Room 10", capacity: 25, location: "Main Campus", type: "Indoor", equipment: "Yoga Mats, Weights" },
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
                        setConflictMessage(`Conflict detected! Training rooms with index ${numericIndexes.join(", ")} are unavailable.`);
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
        <div className="training-container">
            <div className="training-room">
                <h1>Welcome to the Training Room Page</h1>
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

                <div className="room-list">
                    {trainingRooms
                        .filter(room => !hiddenIndexes.includes(room.index))
                        .map((room) => (
                            <div key={room.index} className="facility-box">
                                <div className="room-details">
                                    <span className="room-name">{room.name}</span>
                                    <span className="room-capacity">Capacity: {room.capacity}</span>
                                    <span className="room-location">Location: {room.location}</span>
                                    <span className="room-type">Type: {room.type}</span>
                                    <span className="room-equipment">Equipment: {room.equipment}</span>
                                </div>
                                <button className="form-button" onClick={() => goToForms(room.name)}>To Form</button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Training;
