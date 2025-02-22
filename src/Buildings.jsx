import Button from "./Button.jsx";

function Buildings() {
    return (
        <div>
            <h1>Welcome to Buildings Page</h1>
            <Button name="Go to Home" to="/" />
            <Button name="Go to Rooms" to="/Rooms" />
        </div>
    );
}

export default Buildings;