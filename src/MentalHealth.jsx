import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './MentalHealth.css';

const BASE_URL = "http://localhost:5000"; // Change this if backend is deployed elsewhere

function MentalHealth() {
    const navigate = useNavigate();
    const [hiddenIndexes, setHiddenIndexes] = useState([]);
    const [conflictMessage, setConflictMessage] = useState("");

    const goToForms = (professionalName) => {
        navigate("/FormsPage", { state: { message: professionalName } });
    };

    const goToHome = () => {
        navigate("/");
    };

    const mentalHealthProfessionals = [
        { index: 1, name: "Dr. Miller", specialty: "Counseling", location: "Main Campus", availability: "Mon-Fri 9am-5pm", method: "Talk Therapy, Cognitive Behavioral Therapy" },
        { index: 2, name: "Dr. Clark", specialty: "Psychiatry", location: "North Campus", availability: "Mon, Wed, Fri 10am-4pm", method: "Medication Management, Therapy" },
        { index: 3, name: "Dr. Wilson", specialty: "Clinical Psychology", location: "South Campus", availability: "Tue-Thu 8am-3pm", method: "Psychological Assessment, Therapy" },
        { index: 4, name: "Dr. Davis", specialty: "Stress Management", location: "East Campus", availability: "Mon-Fri 8am-2pm", method: "Mindfulness, Relaxation Techniques" },
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
                        setConflictMessage(`Conflict detected! Professionals with index ${numericIndexes.join(", ")} are unavailable.`);
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
                date: { month: "February", day: 25, year: 2025, startTime: "10:00", endTime: "11:00" }
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
        <div className="mentalhealth-page">
            <h1 className="mentalhealth-title">Welcome to Mental Health Services</h1>
            <button className="mentalhealth-home-button" onClick={goToHome}>Home</button>

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

            <div className="mentalhealth-list">
                {mentalHealthProfessionals
                    .filter(professional => !hiddenIndexes.includes(professional.index))
                    .map((professional) => (
                        <div key={professional.index} className="mentalhealth-box">
                            <div className="mentalhealth-details">
                                <span className="professional-name">{professional.name}</span>
                                <span className="professional-specialty">Specialty: {professional.specialty}</span>
                                <span className="professional-location">Location: {professional.location}</span>
                                <span className="professional-availability">Availability: {professional.availability}</span>
                                <span className="professional-method">Therapy Method: {professional.method}</span>
                            </div>
                            <button className="form-button" onClick={() => goToForms(professional.name)}>To Form</button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MentalHealth;
