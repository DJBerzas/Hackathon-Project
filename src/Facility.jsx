import { useNavigate } from "react-router-dom";
import "./Facility.css"; // Import the Facility-specific CSS

function Facility() {
    const navigate = useNavigate();

    const goToCalendarFB = () => {
      navigate("/CalandarAndTime", { state: { message: "Building" } });
    };
    const goToCalendarFT = () => {
      navigate("/CalandarAndTime", { state: { message: "Training" } });
    };
    const goToCalendarFSF = () => {
      navigate("/CalandarAndTime", { state: { message: "SportsFacility" } });
    };
    const goToHome = () => {
      navigate("/");
    };

    return (
        <div className="facility-page">
            <div className="facility-container">
                <h1 className="facility-title">Welcome to Facility</h1>
                <div className="button-container">
                    <button className="facility-button" onClick={goToHome}>Home</button>
                    <button className="facility-button" onClick={goToCalendarFB}>Go to Building</button>
                    <button className="facility-button" onClick={goToCalendarFT}>Go to Training</button>
                    <button className="facility-button" onClick={goToCalendarFSF}>Go to Sports Facility</button>
                </div>
            </div>
        </div>
    );
}

export default Facility;
