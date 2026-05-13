const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const Attendance = require("../models/attandanceModel.js");

exports.createManager = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const manager = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "manager"
        });

        res.status(201).json({
            message: "Manager created successfully",
            manager: {
                _id: manager._id,
                name: manager.name,
                email: manager.email,
                role: manager.role
            }
        });

    } catch (error) {
        console.error("Create manager error:", error);
        res.status(500).json({
            message: error.message || "Failed to create manager"
        });
    }
};

// Get all managers
exports.getManagers = async (req, res) => {

    try {
        const managers = await User.find({
            role: "manager"
        });

        res.json(managers);

    } catch (error) {

        res.status(500).json(error);
    }
};


// Get all employees
exports.getEmployees = async (req, res) => {

    try {
        const employees = await User.find({
            role: "employee"
        }).populate("managerId", "name email");

        res.json(employees);

    } catch (error) {

        res.status(500).json(error);
    }
};


// Get all attendance
exports.getAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find()
        .populate("employeeId", "name")
        .populate("managerId", "name");

        res.json(attendance);

    } catch (error) {

        res.status(500).json(error);
    }
};