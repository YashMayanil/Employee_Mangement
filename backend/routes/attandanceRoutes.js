const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddlware");

const {

    markAttendance,

    getManagerAttendance,

    getAllAttendance,

    getMyAttendance,

    markSelfAttendance,

    markManagerAttendance,

    getOwnManagerAttendance

} = require("../controllers/attandanceController");



// Manager marks attendance
router.post(
    "/mark",
    auth,
    role("manager"),
    markAttendance
);



// Manager gets own employee attendance
router.get(
    "/manager",
    auth,
    role("manager"),
    getManagerAttendance
);



// Admin gets all attendance
router.get(
    "/admin",
    auth,
    role("admin"),
    getAllAttendance
);


// Employee gets own attendance
router.get(
    "/me",
    auth,
    role("employee"),
    getMyAttendance
);


//marking self attendance
router.post(
   "/mark-self",
   auth,
   role("employee"),
   markSelfAttendance
);

// Manager marks their own attendance
router.post(
   "/mark-manager",
   auth,
   role("manager"),
   markManagerAttendance
);

// Manager gets their own attendance
router.get(
   "/my-attendance",
   auth,
   role("manager"),
   getOwnManagerAttendance
);

module.exports = router;