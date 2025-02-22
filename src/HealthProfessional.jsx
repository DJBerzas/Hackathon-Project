import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom" 

function HealthProfessional() {

    const navigate = useNavigate();

    const goToCalendarFPT = () => {
      navigate("/CalandarAndTime", { state: { message: "PT" } });
    };
    const goToCalendarFR = () => {
      navigate("/CalandarAndTime", { state: { message: "Recovery" } });
    };
    const goToCalendarFMH= () => {
      navigate("/CalandarAndTime", { state: { message: "MentalHealth" } });
    };
    const goToHome = () => {
      navigate("/");
    };

    return (
        <div>
            <h1>Welcome to Health Prof</h1>
            <button onClick={goToHome}>Home</button>
            <button onClick={goToCalendarFPT}>Go to PT</button>
            <button onClick={goToCalendarFR}>Go to Recovery</button>
            <button onClick={goToCalendarFMH}>Go to Mental Health</button> 
        </div>
    );
}

export default HealthProfessional;