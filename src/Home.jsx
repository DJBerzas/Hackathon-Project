import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Button from "./Button.jsx";


import Facility from "./Facility.jsx";
import HealthProfessional from "./HealthProfessional.jsx";
import SeeEvent from "./SeeEvent.jsx"
import MentalHealth from "./MentalHealth.jsx";
import Recovery  from "./Recovery.jsx";
import PT from "./PT.jsx";


function Home() {
    return (
        <body>
                
            
            <div>
                <h1 class = 'test'>Welcome to Home Page</h1>
                <div class="navbar">
                    <Button name="Go to Facility" to="/Facility" />
                    <Button name="Go to HealthProfessional" to="/HealthProfessional" />
                    <Button name="See Events" to="/SeeEvent" />
                </div>
            </div>
        
                
        </body>
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
                <Route path="/MentalHealth" element={<MentalHealth/>} />
                <Route path="/PT" element={<PT/>} />
                <Route path="/Recovery" element={<Recovery/>} />
                
                
            </Routes>
        </Router>
    );
}

export default App;
