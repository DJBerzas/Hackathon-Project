import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
import "./Forms.css";
import { useNavigate, useLocation } from "react-router-dom";

function FormsPage() {
    const location = useLocation(); 
    const message = location.state?.message || "No data received"; 

    const [activeTab, setActiveTab] = useState(null);


    const [event, setEvent] = useState({
        event_at: { event_at: "" },
        security: { personnel: "", contact: "" },
        health: { professionals: "", contact: "" },
        equipment: { needed: "", quantity: "" },
        bus: { count: "", pickupTime: "", pickupLocation: "", dropoffLocation: "", dropoffTime: "" },
        food: { type: "", quantity: "" },
        other: { notes: "" }
    });


    useEffect(() => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            event_at: { event_at: message } 
        }));
    }, [message]); 

    
    const handleTabClick = (tab) => {
        setActiveTab(tab === activeTab ? null : tab); 
    };

   
    const handleInputChange = (event) => {
        const { name, value, dataset } = event.target;
        const category = dataset.category; 

        setEvent((prevEvent) => ({
            ...prevEvent,
            [category]: {
                ...prevEvent[category],
                [name]: value
            }
        }));
    };


    const clearInputArray = async () => {
        try {
            const response = await fetch("http://localhost:5000/clearDates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
        } catch (error) {
            console.error("Error clearing input array:", error);
            alert("Failed to clear stored dates.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Final Event Data:", event);

        try {
            const response = await fetch("http://localhost:5000/addEvent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) {
                throw new Error("Failed to submit event.");
            }

            const data = await response.json();
            console.log("Event added successfully:", data);
            alert("Event details saved successfully!");


            await clearInputArray();

        } catch (error) {
            console.error("Error adding event:", error);
            alert("There was an error saving the event.");
        }
    };

    return (
        <div className="forms-page">
            <h1>Event Form</h1>
            <Button name="Go to Home" to="/" />

            <div className="forms-container">

                <div className="sidebar">
                    <ul>
                        <li onClick={() => handleTabClick("security")}>Security</li>
                        <li onClick={() => handleTabClick("health")}>Health Professionals</li>
                        <li onClick={() => handleTabClick("equipment")}>Equipment</li>
                        <li onClick={() => handleTabClick("bus")}>Bus Info</li>
                        <li onClick={() => handleTabClick("food")}>Food</li>
                        <li onClick={() => handleTabClick("other")}>Other Notes</li>
                        <li onClick={() => handleTabClick("finalize")}>Finalize</li>
                    </ul>
                </div>


                <div className="form-fields">
                    <form onSubmit={handleSubmit}>
                        {activeTab === "security" && (
                            <div className="form-section">
                                <h3>Security</h3>
                                <label>Number of Security Personnel</label>
                                <input type="number" name="personnel" data-category="security" value={event.security.personnel} onChange={handleInputChange} />

                                <label>Security Contact Information</label>
                                <input type="text" name="contact" data-category="security" value={event.security.contact} onChange={handleInputChange} />
                            </div>
                        )}

                        {activeTab === "health" && (
                            <div className="form-section">
                                <h3>Health Professionals</h3>
                                <label>Number of Health Professionals</label>
                                <input type="number" name="professionals" data-category="health" value={event.health.professionals} onChange={handleInputChange} />

                                <label>Health Professional Contact</label>
                                <input type="text" name="contact" data-category="health" value={event.health.contact} onChange={handleInputChange} />
                            </div>
                        )}

                        {activeTab === "equipment" && (
                            <div className="form-section">
                                <h3>Equipment</h3>
                                <label>Equipment Needed</label>
                                <input type="text" name="needed" data-category="equipment" value={event.equipment.needed} onChange={handleInputChange} />

                                <label>Quantity</label>
                                <input type="number" name="quantity" data-category="equipment" value={event.equipment.quantity} onChange={handleInputChange} />
                            </div>
                        )}

                        {activeTab === "bus" && (
                            <div className="form-section">
                                <h3>Bus Info</h3>
                                <label>Number of Buses</label>
                                <input type="number" name="count" data-category="bus" value={event.bus.count} onChange={handleInputChange} />

                                <label>Pickup Location</label>
                                <input type="text" name="pickupLocation" data-category="bus" value={event.bus.pickupLocation} onChange={handleInputChange} />

                                <label>Bus Pickup Time</label>
                                <input type="time" name="pickupTime" data-category="bus" value={event.bus.pickupTime} onChange={handleInputChange} />

                                <label>Drop-off Location</label>
                                <input type="text" name="dropoffLocation" data-category="bus" value={event.bus.dropoffLocation} onChange={handleInputChange} />

                                <label>Drop-off Time</label>
                                <input type="time" name="dropoffTime" data-category="bus" value={event.bus.dropoffTime} onChange={handleInputChange} />
                            </div>
                        )}

                        {activeTab === "food" && (
                            <div className="form-section">
                                <h3>Food</h3>
                                <label>Food Type</label>
                                <input type="text" name="type" data-category="food" value={event.food.type} onChange={handleInputChange} />

                                <label>Food Quantity</label>
                                <input type="number" name="quantity" data-category="food" value={event.food.quantity} onChange={handleInputChange} />
                            </div>
                        )}

                        {activeTab === "other" && (
                            <div className="form-section">
                                <h3>Other Notes</h3>
                                <label>Additional Information</label>
                                <textarea name="notes" data-category="other" value={event.other.notes} onChange={handleInputChange} rows="4"></textarea>
                            </div>
                        )}

                 
                        {activeTab === "finalize" && (
                            <div className="form-section">
                                <h3>Finalize Event Details</h3>
                                <p><strong>Event:</strong> {event.event_at.event_at} personnel, Contact: {event.security.contact}</p>
                                <p><strong>Security:</strong> {event.security.personnel} personnel, Contact: {event.security.contact}</p>
                                <p><strong>Health Professionals:</strong> {event.health.professionals}, Contact: {event.health.contact}</p>
                                <p><strong>Equipment:</strong> {event.equipment.needed} (Quantity: {event.equipment.quantity})</p>
                                <p><strong>Bus Info:</strong> {event.bus.count} buses, Pickup Location: {event.bus.pickupLocation}, Pickup Time: {event.bus.pickupTime}, Drop-off Location: {event.bus.dropoffLocation}, Drop-off Time: {event.bus.dropoffTime}</p>
                                <p><strong>Food:</strong> {event.food.type} (Quantity: {event.food.quantity})</p>
                                <p><strong>Other Notes:</strong> {event.other.notes}</p>

                                <button type="submit" className="submit-button">Submit</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormsPage;