const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let dataArray = [];
let sportsFacilityTimes = [2, 4, 8];
let inputDate = [];
let dateArray = [];
let events = [];


app.post("/addEvent", (req, res) => {
    const event = req.body; // Get the event object from the request body

    if (!event) {
        return res.status(400).json({ error: "No event data provided" });
    }

    // Push the event into the events array
    events.push(event);

    console.log("Event added:", event); // Log the added event (for debugging)
    res.json({ message: "Event added successfully", event }); // Return a success message and the event
});

app.get("/getEvents", (req, res) => {
    res.json(events); // Make sure events is an array of event objects
});

// ✅ Add a new date to the backend
app.post("/addDate", (req, res) => {
    const { date } = req.body;

    if (!date || !date.month || !date.day || !date.year) {
        return res.status(400).json({ error: "Invalid date format" });
    }

    // Push new date object to array
    inputDate.push({ date });

    console.log("Updated Date Array:", inputDate);
    res.json(inputDate); // Return updated array
});

// ✅ Get all stored dates
app.get("/getDates", (req, res) => {
    res.json(inputDate);
});


app.post("/deleteData", (req, res) => {
    dataArray = [];
    console.log("Data Array Cleared:", dataArray);
    res.json(dataArray);
});

// ✅ Handle sports facility times
app.get("/getSportsFacilityTimes", (req, res) => {
    res.json(sportsFacilityTimes.map(Number)); // Ensure numbers
});

// ✅ Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
