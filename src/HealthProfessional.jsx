import Button from "./Button.jsx";

function HealthProfessional() {
    return (
        <div>
            <h1>Welcome to Health Prof</h1>
            <Button name="Go to Home" to="/" />
            <Button name="Go to Mental Health" to="/MentalHealth" />
            <Button name="Go to PT" to="/PT" />
            <Button name="Go to Recovery" to="/Recovery" />
            
        </div>
    );
}

export default HealthProfessional;