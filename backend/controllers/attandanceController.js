const Attendance = require("../models/attandanceModel");
const User = require("../models/userModel");


// Manager marks attendance
exports.markAttendance = async (req, res) => {

    try {

        const { employeeId, status } = req.body;

        if (!employeeId || !status) {
            return res.status(400).json({
                message: "Employee ID and status are required"
            });
        }

        // Check employee exists
        const employee = await User.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // Check employee belongs to manager
        if (!employee.managerId || employee.managerId.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You cannot mark attendance for this employee"
            });
        }

        // Check if already marked today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendance.findOne({
            employeeId,
            date: { $gte: today }
        });

        if (existingAttendance) {
            return res.status(400).json({
                message: "Attendance already marked for this employee today"
            });
        }

        const attendance = await Attendance.create({

            employeeId,

            managerId: req.user.id,

            role: "employee",

            status,
            date: new Date()
        });

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        console.error("Mark attendance error:", error);
        res.status(500).json({
            message: error.message || "Failed to mark attendance"
        });
    }
};



// Manager gets only their employee attendance
exports.getManagerAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find({

            managerId: req.user.id

        }).populate("employeeId", "name email");

        res.json(attendance);

    } catch (error) {
        console.error("Get manager attendance error:", error);
        res.status(500).json({
            message: error.message || "Failed to fetch attendance"
        });
    }
};



// Admin gets all attendance
exports.getAllAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find()
        .populate("employeeId", "name email")
        .populate("managerId", "name email");

        res.json(attendance);

    } catch (error) {
        console.error("Get all attendance error:", error);
        res.status(500).json({
            message: error.message || "Failed to fetch attendance"
        });
    }
};



// Employee gets own attendance
exports.getMyAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find({

            employeeId: req.user.id

        }).populate("managerId", "name email");

        res.json(attendance);

    } catch (error) {
        console.error("Get my attendance error:", error);
        res.status(500).json({
            message: error.message || "Failed to fetch attendance"
        });
    }
};


exports.markSelfAttendance = async (
    req,
    res
) => {

    try {

        // Find employee

        const employee =
        await User.findById(req.user.id);



        if (!employee) {

            return res.status(404).json({

                message:
                "Employee not found"
            });
        }



        // Check today's attendance

        const today = new Date();

        today.setHours(0, 0, 0, 0);



        const existingAttendance =
        await Attendance.findOne({

            employeeId: req.user.id,

            date: {
                $gte: today
            }
        });



        if (existingAttendance) {

            return res.status(400).json({

                message:
                "Attendance already marked today"
            });
        }



        // Create attendance

        const attendance =
        await Attendance.create({

            employeeId: req.user.id,

            managerId:
            employee.managerId,

            role: "employee",

            status: "Present",

            date: new Date()
        });



        res.status(201).json({

            message:
            "Attendance marked successfully",

            attendance
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message || "Failed to mark attendance"
        });
    }
};


exports.getOwnManagerAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({
            managerId: req.user.id,
            role: "manager"
        }).sort({ date: -1 });

        res.json(attendance);
    } catch (error) {
        console.error("Get own manager attendance error:", error);
        res.status(500).json({
            message: error.message || "Failed to fetch attendance"
        });
    }
};

exports.markManagerAttendance = async (req, res) => {

    try {

        const manager = await User.findById(req.user.id);

        if (!manager) {
            return res.status(404).json({
                message: "Manager not found"
            });
        }

        // Check today's attendance
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendance.findOne({
            managerId: req.user.id,
            date: { $gte: today }
        });

        if (existingAttendance) {
            return res.status(400).json({
                message: "Attendance already marked today"
            });
        }

        const attendance = await Attendance.create({
            managerId: req.user.id,
            role: "manager",
            status: "Present",
            date: new Date()
        });

        res.status(201).json({
            message: "Manager attendance marked successfully",
            attendance
        });

    } catch (error) {
        console.error("Mark manager attendance error:", error);
        res.status(500).json({
            message: error.message || "Failed to mark attendance"
        });
    }
};