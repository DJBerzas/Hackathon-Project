import { useNavigate } from "react-router-dom";
import './Fields.css'; // Import the styles for the Buildings page

function Buildings() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/", { state: { message: "Building" } });
    };

    const goToRooms = () => {
        navigate("/Rooms", { state: { message: "Building" } });
    };

    // Array of buildings with detailed information
    const buildings = [
        { name: "Building 1", capacity: 500, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Building 2", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Building 3", capacity: 700, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Building 4", capacity: 1000, location: "East Campus", type: "Outdoor", equipment: "Stadium" },
        { name: "Building 5", capacity: 450, location: "West Campus", type: "Indoor", equipment: "Gym" },
        { name: "Building 6", capacity: 850, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool, Sauna" },
        { name: "Building 7", capacity: 400, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { name: "Building 8", capacity: 1200, location: "East Campus", type: "Indoor", equipment: "Sports Complex" },
        { name: "Building 9", capacity: 600, location: "South Campus", type: "Outdoor", equipment: "Field" },
        { name: "Building 10", capacity: 950, location: "Main Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Building 11", capacity: 550, location: "West Campus", type: "Indoor", equipment: "Gym, Sauna" },
        { name: "Building 12", capacity: 300, location: "North Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Building 13", capacity: 800, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Building 14", capacity: 1100, location: "East Campus", type: "Indoor", equipment: "Sports Complex, Sauna" },
        { name: "Building 15", capacity: 650, location: "Main Campus", type: "Outdoor", equipment: "Track, Field" },
        { name: "Building 16", capacity: 1200, location: "West Campus", type: "Indoor", equipment: "Gym, Pool" },
        { name: "Building 17", capacity: 450, location: "North Campus", type: "Outdoor", equipment: "Track" },
        { name: "Building 18", capacity: 500, location: "South Campus", type: "Indoor", equipment: "Gym, Basketball Court" },
        { name: "Building 19", capacity: 750, location: "Main Campus", type: "Outdoor", equipment: "Stadium" },
        { name: "Building 20", capacity: 900, location: "East Campus", type: "Indoor", equipment: "Gym, Pool" }
    ];

    return (
        <div className="building-container">
            <div className="building-page">
                <h1>Welcome to the Buildings Page</h1>
                <div className="button-container">
                    <button className="home-button" onClick={goToHome}>Home</button>
                    <button className="home-button" onClick={goToRooms}>Rooms</button>
                </div>
                <div className="facility-list">
                    {buildings.map((building, index) => (
                        <div key={index} className="facility-box">
                            <div className="facility-details">
                                <span className="facility-name">{building.name}</span>
                                <span className="facility-capacity">Capacity: {building.capacity}</span>
                                <span className="facility-location">Location: {building.location}</span>
                                <span className="facility-type">Type: {building.type}</span>
                                <span className="facility-equipment">Equipment: {building.equipment}</span>
                            </div>
                            <button className="form-button" onClick={() => goToForms(building.name)}>To Form</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Buildings;
