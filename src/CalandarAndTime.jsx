import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function CalandarAndTime() {
    const location = useLocation();
    const message = location.state?.message || "No data received";

    const navigate = useNavigate();

    const goToFacility= () => {
      navigate("/Facility");
    };
    const goToHealthProfessional = () => {
      navigate("/HealthProfessional");
    };
    const goToSeeEvent= () => {
      navigate("/Events");
    };
    function switcher(message) {

        if (message === "Building"){
            return "/Buildings"
        }
        else if (message === "Training"){
            return "/Training"
        }
        else{
            return "/SportsFacility"
        }
    }


    const handleButtonClick = () => {
        const destination = switcher(message); // Get the dynamic path based on message
        navigate(destination); // Programmatically navigate to that path
    };

    return (
        <div>
            <h1>Welcome to Calandar Page</h1>
            <p>{message}</p>
            <button onClick={handleButtonClick}>See Facilitys</button>
            <Button name="Continue" to={switcher(message)} />
        </div>
    );
}

export default CalandarAndTime;