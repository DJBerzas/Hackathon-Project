import { useNavigate } from "react-router-dom";
import './Fields.css'; 

function SportsFacility() {
    const navigate = useNavigate();

    const goToForms = (facilityName) => {
        navigate("/FormsPage", { state: { message: facilityName } });
    };

    const goToHome = () => {
        navigate("/", { state: { message: "Home" } });
    };


    const facilities = [
        { name: "Facility 1", capacity: 500, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Facility 2", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Facility 3", capacity: 700, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Facility 4", capacity: 1000, location: "East Campus", type: "Outdoor", equipment: "Stadium" },
        { name: "Facility 5", capacity: 450, location: "West Campus", type: "Indoor", equipment: "Gym" },
        { name: "Facility 6", capacity: 850, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool, Sauna" },
        { name: "Facility 7", capacity: 400, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { name: "Facility 8", capacity: 1200, location: "East Campus", type: "Indoor", equipment: "Sports Complex" },
        { name: "Facility 9", capacity: 600, location: "South Campus", type: "Outdoor", equipment: "Field" },
        { name: "Facility 10", capacity: 950, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Facility 11", capacity: 550, location: "West Campus", type: "Indoor", equipment: "Gym, Sauna" },
        { name: "Facility 12", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Facility 13", capacity: 800, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Facility 14", capacity: 1100, location: "East Campus", type: "Indoor", equipment: "Sports Complex, Sauna" },
        { name: "Facility 15", capacity: 650, location: "Main Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Facility 16", capacity: 1200, location: "West Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Facility 17", capacity: 450, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { name: "Facility 18", capacity: 500, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Facility 19", capacity: 750, location: "Main Campus", type: "Outdoor", equipment: "Stadium" },
        { name: "Facility 20", capacity: 900, location: "East Campus", type: "Indoor", equipment: "Gym, Pool" }
    ];

    return (
        <div className="sports-facility">
            <h1>Welcome to Sports Facility</h1>
            <button className="home-button" onClick={goToHome}>Home</button>

            <div className="facility-list">
                {facilities.map((facility, index) => (
                    <div key={index} className="facility-box">
                        <div className="facility-details">
                            <span className="facility-name">{facility.name}</span>
                            <span className="facility-capacity">Capacity: {facility.capacity}</span>
                            <span className="facility-location">Location: {facility.location}</span>
                            <span className="facility-type">Type: {facility.type}</span>
                            <span className="facility-equipment">Equipment: {facility.equipment}</span>
                        </div>
                        <button className="form-button" onClick={() => goToForms(facility.name)}>To Form</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SportsFacility;
