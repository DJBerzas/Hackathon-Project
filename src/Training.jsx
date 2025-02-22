import Button from "./Button.jsx";

function Training() {
    return (
        <div>
            <h1>Welcome to Training Facility</h1>
            <Button name="Go to Home" to="/" />

            <Button name="Go to Forms" to="/FormsPage" />
        </div>
    );
}

export default Training;