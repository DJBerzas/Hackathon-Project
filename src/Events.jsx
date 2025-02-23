import React, { useState, useEffect } from "react";
import Button from "./Button.jsx"; // Assuming you have a Button component for navigation
import "./Events.css"; // Importing CSS for styling

function Events() {
    const [events, setEvents] = useState([]); // To store the list of events
    const [loading, setLoading] = useState(true); // To show a loading state while fetching data

    // Fetch events from the backend on component mount
    useEffect(() => {
        const fetchEvents = () => {
            fetch("http://localhost:5000/getEvents") // Adjust this URL as needed
                .then((response) => response.json())
                .then((data) => {
                    setEvents(data); // Update the state with fetched events
                    setLoading(false); // Set loading to false once data is fetched
                })
                .catch((error) => {
                    console.error("Error fetching events:", error);
                    setLoading(false); // Handle errors and set loading to false
                });
        };

        fetchEvents(); // Call the fetch function when the component mounts
    }, []);

    return (
        <div className="events-page">
            <h1 className="events-title">Event List</h1>
            <Button name="Go to Home" to="/" />

            {loading ? (
                <p>Loading events...</p> // Show loading message while fetching
            ) : (
                <div className="events-list">
                    {events.length === 0 ? (
                        <p>No events found</p> // Display this message if no events are available
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="event-box">
                                <div className="event-details">
                                    <h3 className="event-category">Security</h3>
                                    <p className="event-item">Personnel: {event.security.personnel}</p>
                                    <p className="event-item">Contact: {event.security.contact}</p>

                                    <h3 className="event-category">Health Professionals</h3>
                                    <p className="event-item">Professionals: {event.health.professionals}</p>
                                    <p className="event-item">Contact: {event.health.contact}</p>

                                    <h3 className="event-category">Equipment</h3>
                                    <p className="event-item">Needed: {event.equipment.needed}</p>
                                    <p className="event-item">Quantity: {event.equipment.quantity}</p>

                                    <h3 className="event-category">Bus Info</h3>
                                    <p className="event-item">Count: {event.bus.count}</p>
                                    <p className="event-item">Pickup Location: {event.bus.pickupLocation}</p>
                                    <p className="event-item">Pickup Time: {event.bus.pickupTime}</p>
                                    <p className="event-item">Pickup Location: {event.bus.dropoffLocation}</p>
                                    <p className="event-item">Drop Off Time: {event.bus.dropoffTime}</p>

                                    <h3 className="event-category">Food</h3>
                                    <p className="event-item">Type: {event.food.type}</p>
                                    <p className="event-item">Quantity: {event.food.quantity}</p>

                                    <h3 className="event-category">Other Notes</h3>
                                    <p className="event-item">Notes: {event.other.notes}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Events;
