const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,

    role: {
        type: String,
        enum: ["admin", "manager", "employee"],
        default: "employee"
    },

    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
});

module.exports = mongoose.model("User", userSchema);