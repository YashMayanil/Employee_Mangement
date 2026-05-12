const express = require("express");

const router = express.Router();

const {

    createManagerTask,

    createEmployeeTask,

    getMyTasks,

    getManagerTasks,

    getAdminTasks,

    updateTaskStatus

} = require("../controllers/taskController");



const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddlware");




// Admin creates manager task
router.post(

    "/admin/create",

    auth,

    role("admin"),

    createManagerTask
);




// Manager creates employee task
router.post(

    "/manager/create",

    auth,

    role("manager"),

    createEmployeeTask
);




// Employee tasks
router.get(

    "/my-tasks",

    auth,

    role("employee"),

    getMyTasks
);




// Manager tasks
router.get(

    "/manager-tasks",

    auth,

    role("manager"),

    getManagerTasks
);




// Admin tasks
router.get(

    "/admin-tasks",

    auth,

    role("admin"),

    getAdminTasks
);




// Employee updates status
router.put(

    "/update-status/:id",

    auth,

    role("employee"),

    updateTaskStatus
);




module.exports = router;