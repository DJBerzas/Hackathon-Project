import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CalandarAndTime() {
    const location = useLocation();
    const message = location.state?.message || "No data received";
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(""); // Store user-selected date
    const [startTime, setStartTime] = useState(""); // Store start time
    const [endTime, setEndTime] = useState(""); // Store end time
    const [latestDate, setLatestDate] = useState(null); // Store only the last submitted date
    const [submitted, setSubmitted] = useState(false); // Controls visibility of "Continue" button

    function switcher(message) {
        switch (message) {
            case "Building": return "/Buildings";
            case "Training": return "/Training";
            case "PT": return "/PT";
            case "Recovery": return "/Recovery";
            case "MentalHealth": return "/MentalHealth";
            default: return "/SportsFacility";
        }
    }

    const handleButtonClick = () => {
        navigate(switcher(message));
    };

    const goToHome = () => {
        navigate("/");
    };

    // 🛠 Handle Date Submission
    const handleDateSubmit = async () => {
        if (!selectedDate || !startTime || !endTime) {
            alert("⚠️ Please select a date, start time, and end time before submitting.");
            return;
        }

        // Convert selected date into { month, day, year } object
        const dateObject = new Date(selectedDate);
        const formattedDate = {
            month: dateObject.toLocaleString('default', { month: 'long' }),
            day: dateObject.getDate(),
            year: dateObject.getFullYear(),
            startTime: startTime, // ✅ Add start time
            endTime: endTime // ✅ Add end time
        };

        try {
            const response = await fetch("http://localhost:5000/addDate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: formattedDate })
            });

            const data = await response.json();
            setLatestDate(formattedDate); // ✅ Store only the last submitted date
            setSubmitted(true); // ✅ Show "Continue" button
            console.log("Updated Date Array (Backend):", data); // Logs full array in console
        } catch (error) {
            console.error("Error submitting date:", error);
        }
    };

    return (
        <div>
            <h1>Welcome to Calendar Page</h1>
            <p>{message}</p>

            {/* 🗓️ Calendar Input */}
            <label>Select a Date:</label>
            <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* ⏰ Start Time Input */}
            <label>Start Time:</label>
            <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
            />

            {/* ⏳ End Time Input */}
            <label>End Time:</label>
            <input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
            />

            <button onClick={handleDateSubmit}>Submit</button>

            {/* ✅ Display Only the Last Submitted Date */}
            {latestDate && (
                <>
                    <h3>Last Submitted Entry:</h3>
                    <p>
                        {latestDate.month} {latestDate.day}, {latestDate.year} <br />
                        From {latestDate.startTime} to {latestDate.endTime}
                    </p>
                </>
            )}

            {/* ✅ "Continue" button appears ONLY after submission */}
            {submitted && <button onClick={handleButtonClick}>Continue</button>}

            <button onClick={goToHome}>Home</button>
        </div>
    );
}

export default CalandarAndTime;
