import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Recovery.css';

const BASE_URL = "http://localhost:5000"; // Change this if backend is deployed elsewhere

function Recovery() {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const recoveryHelpers = [
        { index: 1, name: "John Doe", specialty: "Athletic Recovery", location: "Main Campus", availability: "Mon-Fri 8am-4pm", equipment: "Foam Rollers, Stretching Mats" },
        { index: 2, name: "Jane Smith", specialty: "Muscle Recovery", location: "North Campus", availability: "Mon, Wed, Fri 9am-5pm", equipment: "Resistance Bands, TENS Unit" },
        { index: 3, name: "Emily Johnson", specialty: "Rehabilitation Assistance", location: "South Campus", availability: "Tue-Thu 10am-6pm", equipment: "Massage Balls, Stretching Bands" },
        { index: 4, name: "Michael Brown", specialty: "Post-Workout Recovery", location: "East Campus", availability: "Mon-Fri 7am-3pm", equipment: "Foam Rollers, Recovery Bands" },
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
                        setConflictMessage(`Conflict detected! Recovery Specialists with index ${numericIndexes.join(", ")} are unavailable.`);
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
        <div className="recovery-page">
            <h1 className="recovery-title">Welcome to Recovery Services</h1>
            <button className="recovery-home-button" onClick={() => navigate("/")}>Home</button>

            {conflictMessage && (
                <div className="conflict-message" style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
                    {conflictMessage}
                </div>
            )}

            <p style={{ fontSize: "14px", color: "gray", marginBottom: "10px" }}>
                Hidden Indexes: {hiddenIndexes.length > 0 ? hiddenIndexes.join(", ") : "None"}
            </p>

            <button className="fetch-button" onClick={fetchHiddenIndexes} style={{ marginBottom: "15px", padding: "10px" }}>
                🔄 Check Availability
            </button>

            <div className="recovery-list">
                {recoveryHelpers
                    .filter(helper => !hiddenIndexes.includes(helper.index))
                    .map((helper) => (
                        <div key={helper.index} className="recovery-box">
                            <div className="recovery-details">
                                <span className="helper-name">{helper.name}</span>
                                <span className="helper-specialty">Specialty: {helper.specialty}</span>
                                <span className="helper-location">Location: {helper.location}</span>
                                <span className="helper-availability">Availability: {helper.availability}</span>
                                <span className="helper-equipment">Equipment: {helper.equipment}</span>
                            </div>
                            <button className="form-button" onClick={() => navigate("/FormsPage", { state: { message: helper.name } })}>
                                To Form
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Recovery;
