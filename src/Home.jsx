import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

function Home() {
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



    return (
        <div>
            <h1 className='test'>Welcome to Home Page</h1>
            <div className="navbar">
                <button onClick={goToFacility}>See Facilitys</button>
                <button onClick={goToHealthProfessional}>See Healthcare Professionals</button>
                <button onClick={goToSeeEvent}>See Events</button>
            </div>
        </div>
    );
}

export default Home;
