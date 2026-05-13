const router = require("express").Router();
const auth = require("../middleware/authMiddleware.js");
const {
    register,
    login,
    getProfile
} = require("../controllers/authController");

router.post("/register",register);
router.post("/login",login);
router.get("/me",auth,getProfile);

module.exports = router;