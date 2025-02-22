import Button from "./Button.jsx";

function CalandarPage() {
    return (
        <div>
            <h1>Welcome to Calandar Page</h1>
            <Button name="Go to Home" to="/" />
            <Button name="Buildings" to="/Buildings" />
            <Button name="Sports Traing" to="/Training" />
            <Button name="Go to Facility" to="/SportsFacility" />
        </div>
    );
}

export default CalandarPage;