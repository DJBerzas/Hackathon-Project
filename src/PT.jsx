import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./PT.css"; 

const BASE_URL = "http://localhost:5000";

function PT() {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const title = "Welcome to Physical Therapy"; 
    const formPage = "/FormsPage";

    const professionals = [
        { index: 1, name: "Dr. Smith", specialty: "Sports Therapy", location: "Main Campus", availability: "Mon-Fri 9am-5pm", equipment: "Massage Table, TENS Unit" },
        { index: 2, name: "Dr. Johnson", specialty: "Orthopedic Therapy", location: "North Campus", availability: "Mon, Wed, Fri 10am-4pm", equipment: "Ultrasound Therapy" },
        { index: 3, name: "Dr. Lee", specialty: "Rehabilitation Therapy", location: "South Campus", availability: "Tue-Thu 8am-3pm", equipment: "Resistance Bands, Foam Rollers" },
        { index: 4, name: "Dr. Williams", specialty: "Pediatric Therapy", location: "East Campus", availability: "Mon-Fri 8am-2pm", equipment: "Therapy Balls, Pediatric Weights" },
        { index: 5, name: "Dr. Davis", specialty: "Neurological Therapy", location: "West Campus", availability: "Mon-Fri 10am-6pm", equipment: "Balance Boards, Sensory Tools" },
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
                        setConflictMessage(`Conflict detected! Physical Therapists with index ${numericIndexes.join(", ")} are unavailable.`);
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
        <div className="pt-page">
            <h1 className="pt-title">{title}</h1>
            <button className="pt-home-button" onClick={() => navigate("/")}>Home</button>

            {conflictMessage && (
                <div className="conflict-message" style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
                    {conflictMessage}
                </div>
            )}

            <p style={{ fontSize: "14px", color: "gray", marginBottom: "10px" }}>
                Hidden Indexes: {hiddenIndexes.length > 0 ? hiddenIndexes.join(", ") : "None"}
            </p>

            <button className="fetch-button" onClick={fetchHiddenIndexes} style={{ marginBottom: "15px", padding: "10px" }}>
                🔄 Schedule Test Appointment
            </button>

            <div className="pt-list">
                {professionals
                    .filter(professional => !hiddenIndexes.includes(professional.index))
                    .map(professional => (
                        <div key={professional.index} className="pt-box">
                            <div className="pt-details">
                                <span className="professional-name">{professional.name}</span>
                                <span className="professional-specialty">Specialty: {professional.specialty}</span>
                                <span className="professional-location">Location: {professional.location}</span>
                                <span className="professional-availability">Availability: {professional.availability}</span>
                                <span className="professional-equipment">Equipment: {professional.equipment}</span>
                            </div>
                            <button className="form-button" onClick={() => navigate(formPage, { state: { message: professional.name } })}>
                                To Form
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PT;
