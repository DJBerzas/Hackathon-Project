const express = require('express');
const app = express()
require('dotenv').config();
const cors = require("cors");
const corsOptions ={
    origin:("http://localhost:5000")
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send({ fruits: ['apple','orange']});
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
