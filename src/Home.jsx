import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; // Only import this for the Home page

function Home() {
    const navigate = useNavigate();

    const goToFacility = () => navigate("/Facility");
    const goToHealthProfessional = () => navigate("/HealthProfessional");
    const goToSeeEvent = () => navigate("/Events");

    const [testArray, setTestArray] = useState([]);

    const addTestData = async () => {
        const newItem = { id: testArray.length + 1, name: `Test Item ${testArray.length + 1}` };
        const updatedArray = [...testArray, newItem]; // Add new item while keeping existing items
        setTestArray(updatedArray);
        console.log("Updated Array:", updatedArray);

        // Send to backend without overwriting existing data
        await axios.post("http://localhost:5000/addData", { newItem })
            .then(response => {
                setTestArray(response.data); // Update state with backend response
                console.log("Full Data from Backend:", response.data);
            })
            .catch(error => console.error("Error sending data:", error));
    };

    const deleteTestData = async () => {
        setTestArray([]);
        console.log("Array cleared");

        // Tell backend to delete all data
        await axios.post("http://localhost:5000/deleteData")
            .then(response => {
                setTestArray(response.data);
                console.log("Full Data from Backend after delete:", response.data);
            })
            .catch(error => console.error("Error deleting data:", error));
    };

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await axios.get("http://localhost:5000/getData");
            setTestArray(response.data);
            console.log("Fetched Data:", response.data);
        };
        fetchAPI();
    }, []);

    return (
        <div className='home-page'>
            
            <div className = 'home-container'>

            <h1 className='home-title'>Welcome to Home Page</h1>
                <button onClick={goToFacility} className="nav-button">See Facilities</button>
                <button onClick={goToHealthProfessional}className="nav-button">See Healthcare Professionals</button>
                <button onClick={goToSeeEvent}className="nav-button">See Events</button>
                <button onClick={addTestData}className="nav-button">Add Test Data</button>
                <button onClick={deleteTestData}className="nav-button">Delete Test Data</button>
            </div>
        </div>
    );
}

export default Home;
