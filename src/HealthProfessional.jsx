import { useNavigate } from "react-router-dom";
import "./HealthProfessional.css";  

function HealthProfessional() {
    const navigate = useNavigate();

    const goToCalendarFPT = () => {
      navigate("/CalandarAndTime", { state: { message: "PT" } });
    };
    const goToCalendarFR = () => {
      navigate("/CalandarAndTime", { state: { message: "Recovery" } });
    };
    const goToCalendarFMH = () => {
      navigate("/CalandarAndTime", { state: { message: "MentalHealth" } });
    };
    const goToHome = () => {
      navigate("/");
    };

    return (
        <div className="health-professional-page">
            <div className="health-professional-container">
                <h1 className="health-professional-title">Welcome to Health Professional</h1>
                <button onClick={goToHome} className="nav-button">Home</button>
                <button onClick={goToCalendarFPT} className="nav-button">Go to PT</button>
                <button onClick={goToCalendarFR} className="nav-button">Go to Recovery</button>
                <button onClick={goToCalendarFMH} className="nav-button">Go to Mental Health</button>
            </div>
        </div>
    );
}

export default HealthProfessional;
