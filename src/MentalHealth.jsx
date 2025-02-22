import { useNavigate } from "react-router-dom";
import './MentalHealth.css';  // Import the styles for the MentalHealth page

function MentalHealth() {
    const navigate = useNavigate();

    const goToForms = () => {
        navigate("/FormsPage");
    };

    const goToHome = () => {
        navigate("/");
    };

    // Array of mental health professionals with detailed information
    const mentalHealthProfessionals = [
        { name: "Dr. Miller", specialty: "Counseling", location: "Main Campus", availability: "Mon-Fri 9am-5pm", method: "Talk Therapy, Cognitive Behavioral Therapy" },
        { name: "Dr. Clark", specialty: "Psychiatry", location: "North Campus", availability: "Mon, Wed, Fri 10am-4pm", method: "Medication Management, Therapy" },
        { name: "Dr. Wilson", specialty: "Clinical Psychology", location: "South Campus", availability: "Tue-Thu 8am-3pm", method: "Psychological Assessment, Therapy" },
        { name: "Dr. Davis", specialty: "Stress Management", location: "East Campus", availability: "Mon-Fri 8am-2pm", method: "Mindfulness, Relaxation Techniques" },
    ];

    return (
        <div className="mentalhealth-page">
            <h1 className="mentalhealth-title">Welcome to Mental Health Services</h1>
            <button className="mentalhealth-home-button" onClick={goToHome}>Home</button>

            <div className="mentalhealth-list">
                {mentalHealthProfessionals.map((professional, index) => (
                    <div key={index} className="mentalhealth-box">
                        <div className="mentalhealth-details">
                            <span className="professional-name">{professional.name}</span>
                            <span className="professional-specialty">Specialty: {professional.specialty}</span>
                            <span className="professional-location">Location: {professional.location}</span>
                            <span className="professional-availability">Availability: {professional.availability}</span>
                            <span className="professional-method">Therapy Method: {professional.method}</span>
                        </div>
                        <button className="form-button" onClick={goToForms}>To Form</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MentalHealth;
