const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddlware");

const {
    createEmployee,
    getEmployees
} = require("../controllers/managerController");

router.post("/create-employee",auth,role("manager"),createEmployee);
router.get("/employees",auth,role("manager"),getEmployees);

module.exports = router;