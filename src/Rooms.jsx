import Button from "./Button.jsx";

function Rooms() {
    return (
        <div>
            <h1>Welcome to Rooms</h1>
            <Button name="Go to Home" to="/" />

            <Button name="Go to Forms" to="/FormsPage" />
        </div>
    );
}

export default Rooms;