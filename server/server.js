const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let inputDate = [];

let schedules = [
    {
        schedule: "buildingSchedule",
        data: [
            { month: 'February', day: 25, year: 2025, startTime: '19:13', endTime: '21:11', index: 2 },
            { month: 'March', day: 10, year: 2024, startTime: '08:30', endTime: '10:15', index: 3 }
        ]
    },
    {
        schedule: "trainingSchedule",
        data: [
            { month: 'April', day: 5, year: 2025, startTime: '07:00', endTime: '08:45', index: 1 },
            { month: 'June', day: 12, year: 2024, startTime: '15:30', endTime: '17:00', index: 2 }
        ]
    },
    {
        schedule: "sportFacilitySchedule",
        data: [
            { month: 'May', day: 22, year: 2025, startTime: '12:00', endTime: '14:00', index: 5 },
            { month: 'July', day: 8, year: 2024, startTime: '16:15', endTime: '18:30', index: 6 }
        ]
    },
    {
        schedule: "PTSchedule",
        data: [
            { month: 'September', day: 14, year: 2025, startTime: '09:00', endTime: '10:30', index: 7 },
            { month: 'October', day: 3, year: 2024, startTime: '14:00', endTime: '16:00', index: 8 }
        ]
    },
    {
        schedule: "RecoverySchedule",
        data: [
            { month: 'November', day: 20, year: 2025, startTime: '11:00', endTime: '12:45', index: 9 },
            { month: 'December', day: 5, year: 2024, startTime: '13:15', endTime: '15:00', index: 10 }
        ]
    },
    {
        schedule: "MentalHealthSchedule",
        data: [
            { month: 'January', day: 10, year: 2025, startTime: '10:00', endTime: '11:30', index: 11 },
            { month: 'February', day: 22, year: 2024, startTime: '17:00', endTime: '18:30', index: 12 }
        ]
    }
];

// Function to convert time (HH:MM) to minutes for easy comparison
const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

// Normalize month names to ensure consistency
const normalizeMonth = (month) => {
    if (!isNaN(month)) {
        return new Date(2022, month - 1, 1).toLocaleString('default', { month: 'long' });
    }
    return new Date(Date.parse(month + " 1, 2022")).toLocaleString('default', { month: 'long' });
};

// Endpoint to add a date and check for conflicts
app.post("/addDate", (req, res) => {
    const { date } = req.body;

    if (!date || !date.month || !date.day || !date.year || !date.startTime || !date.endTime) {
        return res.status(400).json({ error: "Invalid date format. Ensure month, day, year, startTime, and endTime are provided." });
    }

    // Normalize the input month
    const inputMonth = normalizeMonth(date.month);

    console.log("Received new date:", { ...date, month: inputMonth });

    inputDate.push({ date: { ...date, month: inputMonth } });

    let hiddenIndexes = [];

    // Iterate through the schedules to check for conflicts
    schedules.forEach(schedule => {
        schedule.data.forEach(item => {
            const itemStart = convertTimeToMinutes(item.startTime);
            const itemEnd = convertTimeToMinutes(item.endTime);
            const inputStart = convertTimeToMinutes(date.startTime);
            const inputEnd = convertTimeToMinutes(date.endTime);

            if (
                item.month === inputMonth &&
                Number(item.day) === Number(date.day) &&
                Number(item.year) === Number(date.year) &&
                (
                    (inputStart >= itemStart && inputStart < itemEnd) ||  // Overlap at start
                    (inputEnd > itemStart && inputEnd <= itemEnd) ||      // Overlap at end
                    (inputStart <= itemStart && inputEnd >= itemEnd)      // Full overlap
                )
            ) {
                console.log(`Conflict Found! Index: ${item.index}`);
                hiddenIndexes.push(item.index);
            }
        });
    });

    hiddenIndexes = [...new Set(hiddenIndexes)].filter(index => index !== null && index !== undefined);

    console.log("Final Hidden Indexes:", hiddenIndexes);
    res.json({ hiddenIndexes });
});

// Endpoint to get all conflicting indexes for added dates
app.get("/getDates", (req, res) => {
    let hiddenIndexes = [];

    if (inputDate.length === 0) {
        console.warn("⚠️ No dates in inputDate, using default date for testing.");

        // Simulating a default date for testing
        const today = new Date();
        const defaultDate = {
            month: today.toLocaleString('default', { month: 'long' }),
            day: today.getDate(),
            year: today.getFullYear(),
            startTime: "08:00",
            endTime: "09:00" // Example time for testing
        };

        inputDate.push({ date: defaultDate });
    }

    inputDate.forEach(input => {
        schedules.forEach(schedule => {
            schedule.data.forEach(item => {
                const itemStart = convertTimeToMinutes(item.startTime);
                const itemEnd = convertTimeToMinutes(item.endTime);
                const inputStart = convertTimeToMinutes(input.date.startTime);
                const inputEnd = convertTimeToMinutes(input.date.endTime);

                if (
                    item.month === input.date.month &&
                    Number(item.day) === Number(input.date.day) &&
                    Number(item.year) === Number(input.date.year) &&
                    (
                        (inputStart >= itemStart && inputStart < itemEnd) ||  // Overlap at start
                        (inputEnd > itemStart && inputEnd <= itemEnd) ||      // Overlap at end
                        (inputStart <= itemStart && inputEnd >= itemEnd)      // Full overlap
                    )
                ) {
                    hiddenIndexes.push(item.index);
                }
            });
        });
    });

    console.log("Returning Hidden Indexes:", hiddenIndexes);
    res.json(hiddenIndexes);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
