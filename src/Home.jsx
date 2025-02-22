import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import "./Home.css"; // Only import this for the Home page

function Home() {
    const navigate = useNavigate();

    const goToFacility = () => {
        navigate("/Facility");
    };
    const goToHealthProfessional = () => {
        navigate("/HealthProfessional");
    };
    const goToSeeEvent = () => {
        navigate("/Events");
    };

    return (
        <div className="home-page">
            <div className="home-container">
                <h1 className="home-title">Welcome to the Home Page</h1>
                <button className="nav-button" onClick={goToFacility}>See Facilities</button>
                <button className="nav-button" onClick={goToHealthProfessional}>See Healthcare Professionals</button>
                <button className="nav-button" onClick={goToSeeEvent}>See Events</button>
            </div>
        </div>
    );
}

export default Home;
