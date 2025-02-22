import { useNavigate } from "react-router-dom";
import './Recovery.css';  // Import the styles for the Recovery page

function Recovery() {
    const navigate = useNavigate();

    const goToForms = (helperName) => {
        navigate("/FormsPage", { state: { message: helperName } });
    };

    const goToHome = () => {
        navigate("/");
    };

    // Array of recovery helpers with detailed information
    const recoveryHelpers = [
        { name: "John Doe", specialty: "Athletic Recovery", location: "Main Campus", availability: "Mon-Fri 8am-4pm", equipment: "Foam Rollers, Stretching Mats" },
        { name: "Jane Smith", specialty: "Muscle Recovery", location: "North Campus", availability: "Mon, Wed, Fri 9am-5pm", equipment: "Resistance Bands, TENS Unit" },
        { name: "Emily Johnson", specialty: "Rehabilitation Assistance", location: "South Campus", availability: "Tue-Thu 10am-6pm", equipment: "Massage Balls, Stretching Bands" },
        { name: "Michael Brown", specialty: "Post-Workout Recovery", location: "East Campus", availability: "Mon-Fri 7am-3pm", equipment: "Foam Rollers, Recovery Bands" },
    ];

    return (
        <div className="recovery-page">
            <h1 className="recovery-title">Welcome to Recovery</h1>
            <button className="recovery-home-button" onClick={goToHome}>Home</button>

            <div className="recovery-list">
                {recoveryHelpers.map((helper, index) => (
                    <div key={index} className="recovery-box">
                        <div className="recovery-details">
                            <span className="helper-name">{helper.name}</span>
                            <span className="helper-specialty">Specialty: {helper.specialty}</span>
                            <span className="helper-location">Location: {helper.location}</span>
                            <span className="helper-availability">Availability: {helper.availability}</span>
                            <span className="helper-equipment">Equipment: {helper.equipment}</span>
                        </div>
                        <button className="form-button" onClick={() => goToForms(helper.name)}>To Form</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recovery;
