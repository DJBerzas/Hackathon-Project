import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom"   

function Buildings() {
    const navigate = useNavigate();

    const goToHome = () => {
      navigate("/", { state: { message: "Building" } });
    };
    const goToRooms = () => {
      navigate("/Rooms", { state: { message: "Building" } });
    };
    return (
        <div>
            <h1>Welcome to Buildings Page</h1>
            <button onClick={goToHome}>Home</button>
            <button onClick={goToRooms}>Room</button>
        </div>
    );
}

export default Buildings;