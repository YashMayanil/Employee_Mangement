const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.createEmployee = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await User.create({
            name,
            email,
            password: hashedPassword,

            role: "employee",

            managerId: req.user.id
        });

        res.json(employee);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getEmployees = async (req, res) => {

    try {

        const employees = await User.find({
            managerId: req.user.id
        });

        res.json(employees);

    } catch (error) {
        res.status(500).json(error);
    }
};