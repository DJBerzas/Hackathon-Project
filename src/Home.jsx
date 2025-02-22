import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Button from "./Button.jsx";


import Facility from "./Facility.jsx";
import HealthProfessional from "./HealthProfessional.jsx";
import SeeEvent from "./SeeEvent.jsx"

function Home() {
    return (
        <div>
            <h1>Welcome to Home Page</h1>
            <Button name="Go to Facility" to="/Facility" />
            <Button name="Go to HealthProfessional" to="/HealthProfessional" />
            <Button name="See Events" to="/SeeEvent" />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Facility" element={<Facility />} />
                <Route path="/HealthProfessional" element={<HealthProfessional/>} />
                <Route path="/SeeEvent" element={<SeeEvent/>} />
            </Routes>
        </Router>
    );
}

export default App;
