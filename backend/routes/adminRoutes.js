const router = require("express").Router();

const auth = require("../middleware/authMiddleware.js");
const role = require("../middleware/roleMiddlware.js");

const {
    createManager,

    getManagers,

    getEmployees,

    getAttendance
} = require("../controllers/adminController");

router.post(
    "/create-manager",
    auth,
    role("admin"),
    createManager
);

router.get(
    "/managers",
    auth,
    role("admin"),
    getManagers
);

router.get(
    "/employees",
    auth,
    role("admin"),
    getEmployees
);

router.get(
    "/attendance",
    auth,
    role("admin"),
    getAttendance
);


module.exports = router;