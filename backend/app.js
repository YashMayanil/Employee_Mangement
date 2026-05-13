const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
// CORS Configuration
app.use(cors(corsOptions));

//to parse the json data
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Error:", err));


// api routes register here
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/manager", require("./routes/managerRoutes"));
app.use("/api/attendance", require("./routes/attandanceRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));

// server start here
app.listen(5000, () => {
    console.log("Server running on port 5000");
});