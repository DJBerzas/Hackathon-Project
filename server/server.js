const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let dataArray = []; 

app.post("/addData", (req, res) => {
    newData = req.body.data; // Store received array
    console.log("Updated Data Array:", dataArray);
    dataArray.push(newData)
    res.json(dataArray); // Send back full array
});

app.post("/deleteData", (req, res) => {
    dataArray = []; // Clear array
    console.log("Data Array Cleared:", dataArray);
    res.json(dataArray); // Send back empty array
});

app.get("/", (req, res) => {
    res.json({ fruits: ["Apple", "Banana", "Cherry"] }); // Example GET response
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.get("/getData", (req, res) => {
    res.json(dataArray); // Send the stored test data
});

