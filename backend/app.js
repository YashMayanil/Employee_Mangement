const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/manager", require("./routes/managerRoutes"));
app.use("/api/attendance", require("./routes/attandanceRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});