import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom"   

function Facility() {
    const navigate = useNavigate(); // ✅ Get the navigate function

    const goToCalendarFB = () => {
      navigate("/CalandarAndTime", { state: { message: "Building" } });
    };
    const goToCalendarFT = () => {
      navigate("/CalandarAndTime", { state: { message: "Training" } });
    };
    const goToCalendarFSF = () => {
      navigate("/CalandarAndTime", { state: { message: "SportsFacility" } });
    };

    return (
        <div>
            <h1>Welcome to Facility</h1>
            
            <Button name="Go to Home" to="/" />
            <button onClick={goToCalendarFB}>Go to Building</button>
            <button onClick={goToCalendarFT}>Go to Training</button>
            <button onClick={goToCalendarFSF}>Go to Sports Facility</button>

        </div>
    );
}

export default Facility;
