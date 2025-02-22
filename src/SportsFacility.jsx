import Button from "./Button.jsx";

function SportsFacility() {
    return (
        <div>
            <h1>Welcome to Sports Facility</h1>
            <Button name="Go to Home" to="/" />
            <Button name="Go to Forms" to="/FormsPage" />
        </div>
    );
}

export default SportsFacility;