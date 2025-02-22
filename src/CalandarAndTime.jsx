import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CalandarAndTime() {
    const location = useLocation();
    const message = location.state?.message || "No data received";

    const navigate = useNavigate();

    function switcher(message) {
        if (message === "Building") {
            return "/Buildings";
        } else if (message === "Training") {
            return "/Training";
        } else if (message === "PT") {
            return "/PT";
        } else if (message === "Recovery") {
            return "/Recovery";
        } else if (message === "MentalHealth") {
            return "/MentalHealth";
        } else {
            return "/SportsFacility";
        }
    }

    const handleButtonClick = () => {
        const destination = switcher(message);  
        navigate(destination);  
    };
    const goToHome = () => {
        navigate("/");
      };

    return (
        <div>
            <h1>Welcome to Calendar Page</h1>
            <p>{message}</p>
            {/* Use handleButtonClick to navigate based on message */}
            <button onClick={goToHome}>Home</button>
            <button onClick={handleButtonClick}>Continue</button>
        </div>
    );
}

export default CalandarAndTime;