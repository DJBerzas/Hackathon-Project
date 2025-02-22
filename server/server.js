const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let dataArray = [];
let sportsFacilityTimes = [2, 4, 8];
let inputDate = [];
let dateArray = [];






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
