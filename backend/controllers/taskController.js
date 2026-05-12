const Task = require("../models/taskModel");

const User = require("../models/userModel");


// Admin creates task for manager
exports.createManagerTask = async (
    req,
    res
) => {

    try {

        const {
            title,
            description,
            assignedTo
        } = req.body;



        const manager = await User.findById(
            assignedTo
        );



        if (
            !manager ||
            manager.role !== "manager"
        ) {

            return res.status(400).json({
                message:
                "Manager not found"
            });
        }



        const task = await Task.create({

            title,

            description,

            assignedTo,

            assignedBy: req.user.id
        });



        res.status(201).json({

            message:
            "Task assigned to manager",

            task
        });

    } catch (error) {

        res.status(500).json(error);
    }
};




// Manager creates task for employee
exports.createEmployeeTask = async (
    req,
    res
) => {

    try {

        const {
            title,
            description,
            assignedTo
        } = req.body;



        const employee =
        await User.findById(
            assignedTo
        );



        if (
            !employee ||
            employee.role !== "employee"
        ) {

            return res.status(400).json({
                message:
                "Employee not found"
            });
        }



        // Ownership check

        if (
            employee.managerId.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message:
                "You cannot assign task to this employee"
            });
        }



        const task = await Task.create({

            title,

            description,

            assignedTo,

            assignedBy: req.user.id
        });



        res.status(201).json({

            message:
            "Task assigned to employee",

            task
        });

    } catch (error) {

        res.status(500).json(error);
    }
};



// Employee sees own tasks
exports.getMyTasks = async (
    req,
    res
) => {

    try {

        const tasks = await Task.find({
            
            assignedTo: req.user.id
        
        }).populate(
            "assignedBy",
            "name email"
        );


        res.json(tasks);

    } catch (error) {

        res.status(500).json(error);
    }
};



// Manager sees tasks
exports.getManagerTasks = async (
    req,
    res
) => {

    try {

        const tasks = await Task.find({

            $or: [

                {
                    assignedTo: req.user.id
                },

                {
                    assignedBy: req.user.id
                }
            ]

        })

        .populate(
            "assignedTo",
            "name email"
        )

        .populate(
            "assignedBy",
            "name email"
        );



        res.json(tasks);

    } catch (error) {

        res.status(500).json(error);
    }
};



// Admin sees all tasks
exports.getAdminTasks = async (
    req,
    res
) => {

    try {

        const tasks = await Task.find()

        .populate(
            "assignedTo",
            "name email role"
        )

        .populate(
            "assignedBy",
            "name email role"
        );


        res.json(tasks);

    } catch (error) {

        res.status(500).json(error);
    }
};




// Update task status
exports.updateTaskStatus = async (
    req,
    res
) => {

    try {

        const { status } = req.body;



        const task = await Task.findById(
            req.params.id
        );



        if (!task) {

            return res.status(404).json({
                message:
                "Task not found"
            });
        }



        // Only assigned employee can update

        if (
            task.assignedTo.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message:
                "Unauthorized"
            });
        }



        task.status = status;

        await task.save();



        res.json({

            message:
            "Task status updated",

            task
        });

    } catch (error) {

        res.status(500).json(error);
    }
};