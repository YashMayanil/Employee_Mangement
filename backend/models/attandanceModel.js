const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    role: {
        type: String,
        enum: ["manager", "employee"],
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present"
    }

});

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);