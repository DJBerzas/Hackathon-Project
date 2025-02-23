import React, { useState, useEffect } from "react";
import "./Events.css";
import Button from "./Button.jsx";

function EventsPage() {
    const [events, setEvents] = useState([]);

    // Simulate fetching events from the backend
    useEffect(() => {
        const fetchEvents = () => {
            // Example events, you can replace this with a fetch call to the backend
            const eventData = [
                {
                    id: 1,
                    security: { personnel: "5", contact: "123-456-7890" },
                    health: { professionals: "3", contact: "health@example.com" },
                    equipment: { needed: "First Aid Kit", quantity: "5" },
                    bus: { count: "2", pickupTime: "10:00 AM" },
                    food: { type: "Pizza", quantity: "50" },
                    other: { notes: "Event at the park" }
                },
                {
                    id: 2,
                    security: { personnel: "6", contact: "987-654-3210" },
                    health: { professionals: "2", contact: "health2@example.com" },
                    equipment: { needed: "Water Bottles", quantity: "100" },
                    bus: { count: "3", pickupTime: "12:00 PM" },
                    food: { type: "Sandwiches", quantity: "60" },
                    other: { notes: "Event at the beach" }
                }
            ];
            setEvents(eventData);
        };

        fetchEvents();
    }, []);

    return (
        <div className="events-page">
            <h1 className="events-title">Event List</h1>
            <Button name="Go to Home" to="/" />

            <div className="events-list">
                {events.map((event) => (
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
                            <p className="event-item">Drop Off Location: {event.bus.dropoffLocation}</p>
                            <p className="event-item">Drop Off Time: {event.bus.dropoffTime}</p>
                            <p className="event-item">Pick Up Location: {event.bus.pickupLocation}</p>
                            <p className="event-item">Pick Up Time: {event.bus.pickUpTime}</p>


                            <h3 className="event-category">Food</h3>
                            <p className="event-item">Type: {event.food.type}</p>
                            <p className="event-item">Quantity: {event.food.quantity}</p>

                            <h3 className="event-category">Other Notes</h3>
                            <p className="event-item">Notes: {event.other.notes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsPage;
