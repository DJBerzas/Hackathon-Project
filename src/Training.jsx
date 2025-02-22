import { useNavigate } from "react-router-dom";
import './Training.css'; // Import the styles for the Training Room page

function Training() {
    const navigate = useNavigate();

    const goToForms = (roomName) => {
        navigate("/TrainingRoomForm", { state: { message: roomName } });
    };

    const goToHome = () => {
        navigate("/", { state: { message: "Home" } });
    };

    // Array of training rooms with detailed information
    const trainingRooms = [
        { name: "Training Room 1", capacity: 20, location: "Main Campus", type: "Indoor", equipment: "Treadmills, Weights" },
        { name: "Training Room 2", capacity: 15, location: "North Campus", type: "Indoor", equipment: "Stationary Bikes, Weights" },
        { name: "Training Room 3", capacity: 30, location: "South Campus", type: "Indoor", equipment: "Free Weights, Machines" },
        { name: "Training Room 4", capacity: 25, location: "East Campus", type: "Indoor", equipment: "Cardio Machines, Weights" },
        { name: "Training Room 5", capacity: 20, location: "West Campus", type: "Indoor", equipment: "Stretching Area, Free Weights" },
        { name: "Training Room 6", capacity: 40, location: "Main Campus", type: "Indoor", equipment: "Full Gym Equipment" },
        { name: "Training Room 7", capacity: 10, location: "North Campus", type: "Indoor", equipment: "Yoga Mats, Weights" },
        { name: "Training Room 8", capacity: 50, location: "East Campus", type: "Indoor", equipment: "CrossFit Equipment" },
        { name: "Training Room 9", capacity: 35, location: "South Campus", type: "Indoor", equipment: "Cardio Machines, Free Weights" },
        { name: "Training Room 10", capacity: 25, location: "Main Campus", type: "Indoor", equipment: "Yoga Mats, Weights" },
    ];

    return (
        <div className="training-container">
            <div className="training-room">
                <h1>Welcome to the Training Room Page</h1>
                <button className="home-button" onClick={goToHome}>Home</button>

                <div className="room-list">
                    {trainingRooms.map((room, index) => (
                        <div key={index} className="room-card">
                            <div className="room-details">
                                <span className="room-name">{room.name}</span>
                                <span className="room-capacity">Capacity: {room.capacity}</span>
                                <span className="room-location">Location: {room.location}</span>
                                <span className="room-type">Type: {room.type}</span>
                                <span className="room-equipment">Equipment: {room.equipment}</span>
                            </div>
                            <button className="form-button" onClick={() => goToForms(room.name)}>To Form</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Training;
