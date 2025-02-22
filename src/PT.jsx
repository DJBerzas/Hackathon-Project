import { useNavigate } from "react-router-dom";
import './PT.css';  // Import the styles for the PT page

function PT() {
    const navigate = useNavigate();

    const goToForms = (professionalName) => {
        navigate("/FormsPage", { state: { message: professionalName } });
    };

    const goToHome = () => {
        navigate("/");
    };

    // Array of health professionals with detailed information
    const professionals = [
        { name: "Dr. Smith", specialty: "Sports Therapy", location: "Main Campus", availability: "Mon-Fri 9am-5pm", equipment: "Massage Table, TENS Unit" },
        { name: "Dr. Johnson", specialty: "Orthopedic Therapy", location: "North Campus", availability: "Mon, Wed, Fri 10am-4pm", equipment: "Ultrasound Therapy" },
        { name: "Dr. Lee", specialty: "Rehabilitation Therapy", location: "South Campus", availability: "Tue-Thu 8am-3pm", equipment: "Resistance Bands, Foam Rollers" },
        { name: "Dr. Williams", specialty: "Pediatric Therapy", location: "East Campus", availability: "Mon-Fri 8am-2pm", equipment: "Therapy Balls, Pediatric Weights" },
        { name: "Dr. Davis", specialty: "Neurological Therapy", location: "West Campus", availability: "Mon-Fri 10am-6pm", equipment: "Balance Boards, Sensory Tools" },
    ];

    return (
        <div className="pt-page">
            <h1 className="pt-title">Welcome to Physical Therapy</h1>
            <button className="pt-home-button" onClick={goToHome}>Home</button>

            <div className="pt-list">
                {professionals.map((professional, index) => (
                    <div key={index} className="pt-box">
                        <div className="pt-details">
                            <span className="professional-name">{professional.name}</span>
                            <span className="professional-specialty">Specialty: {professional.specialty}</span>
                            <span className="professional-location">Location: {professional.location}</span>
                            <span className="professional-availability">Availability: {professional.availability}</span>
                            <span className="professional-equipment">Equipment: {professional.equipment}</span>
                        </div>
                        <button className="form-button" onClick={() => goToForms(professional.name)}>To Form</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PT;
