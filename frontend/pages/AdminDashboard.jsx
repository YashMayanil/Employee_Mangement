import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    //form data 
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    //manager and employee data states for fetching 

    const [managers, setManagers] = useState([]);

    const [employees, setEmployees] = useState([]);

    //attandace data states for fetching 
    const [attendance, setAttendance] = useState([]);



    // Task states for fetching
    const [tasks, setTasks] = useState([]);

    const [taskTitle, setTaskTitle] = useState("");

    const [taskDescription,setTaskDescription] = useState("");

    const [selectedManager,setSelectedManager] = useState("");




    // Logout
    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };




    // Fetch managers
    const fetchManagers = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/admin/managers",

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setManagers(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch employees
    const fetchEmployees = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/admin/employees",

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setEmployees(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch attendance
    const fetchAttendance = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/admin/attendance",

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setAttendance(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch tasks
    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/tasks/admin-tasks",

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    useEffect(() => {

        fetchManagers();

        fetchEmployees();

        fetchAttendance();

        fetchTasks();

    }, []);




    // Create manager
    const createManager = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/admin/create-manager",

                {
                    name,
                    email,
                    password
                },

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            alert("Manager Created Successfully");

            setName("");

            setEmail("");

            setPassword("");

            fetchManagers();

        } catch (error) {

            console.log(error);
        }
    };




    // Assign task to manager
    const assignTask = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/tasks/admin/create",

                {
                    title: taskTitle,

                    description:
                        taskDescription,

                    assignedTo:
                        selectedManager
                },

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            alert("Task Assigned");

            setTaskTitle("");

            setTaskDescription("");

            setSelectedManager("");

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };




    // Employee attendance
    const getTodayAttendance = (employeeId) => {

        const today =
            new Date().toLocaleDateString();

        return attendance.find((item) => {

            return (

                item.employeeId?._id === employeeId &&

                new Date(item.date)
                    .toLocaleDateString() === today
            );
        });
    };




    // Manager attendance
    const getManagerAttendance = (managerId) => {

        const today =
            new Date().toLocaleDateString();

        return attendance.find((item) => {

            return (

                item.managerId?._id === managerId &&

                item.role === "manager" &&

                new Date(item.date)
                    .toLocaleDateString() === today
            );
        });
    };




    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f172a",
                padding: "30px",
                fontFamily: "Arial",
                color: "white"
            }}
        >

            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <div>

                    <h1
                        style={{
                            fontSize: "40px",
                            marginBottom: "10px"
                        }}
                    >
                        Admin Dashboard
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8"
                        }}
                    >
                        Manage managers, employees,
                        attendance and tasks
                    </p>

                </div>



                <button
                    onClick={handleLogout}

                    style={logoutButton}
                >
                    Logout
                </button>

            </div>




            {/* Stats */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div style={statsCard}>

                    <h2>Total Managers</h2>

                    <h1
                        style={{
                            fontSize: "70px",
                            color: "#38bdf8"
                        }}
                    >
                        {managers.length}
                    </h1>

                </div>



                <div style={statsCard}>

                    <h2>Total Employees</h2>

                    <h1
                        style={{
                            fontSize: "70px",
                            color: "#4ade80"
                        }}
                    >
                        {employees.length}
                    </h1>

                </div>

            </div>




            {/* Create Manager */}

            <div style={sectionStyle}>

                <h2>Create Manager</h2>

                <form onSubmit={createManager}>

                    <input
                        type="text"
                        placeholder="Enter Name"

                        value={name}

                        onChange={(e) =>
                            setName(e.target.value)
                        }

                        style={inputStyle}
                    />



                    <input
                        type="email"
                        placeholder="Enter Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                        style={inputStyle}
                    />



                    <input
                        type="password"
                        placeholder="Enter Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                        style={inputStyle}
                    />



                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Create Manager
                    </button>

                </form>

            </div>




            {/* Assign Task */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Assign Task To Manager
                </h2>

                <form onSubmit={assignTask}>

                    <input
                        type="text"
                        placeholder="Task Title"

                        value={taskTitle}

                        onChange={(e) =>
                            setTaskTitle(
                                e.target.value
                            )
                        }

                        style={inputStyle}
                    />



                    <textarea
                        placeholder="Task Description"

                        value={taskDescription}

                        onChange={(e) =>
                            setTaskDescription(
                                e.target.value
                            )
                        }

                        style={{
                            ...inputStyle,
                            height: "100px"
                        }}
                    />



                    <select
                        value={selectedManager}

                        onChange={(e) =>
                            setSelectedManager(
                                e.target.value
                            )
                        }

                        style={inputStyle}
                    >

                        <option value="">
                            Select Manager
                        </option>

                        {
                            managers.map((manager) => (

                                <option
                                    key={manager._id}

                                    value={manager._id}
                                >

                                    {manager.name}

                                </option>
                            ))
                        }

                    </select>



                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Assign Task
                    </button>

                </form>

            </div>




            {/* Managers */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    All Managers
                </h2>

                {
                    managers.map((manager) => {

                        const managerAttendance =getManagerAttendance(manager._id);

                        return (

                            <div key={manager._id} style={cardStyle}>

                                <h3>{manager.name}</h3>

                                <p>{manager.email}</p>



                                <p>

                                    Today's Attendance:
                                    {" "}

                                    <strong
                                        style={{
                                            color:
                                                managerAttendance
                                                    ? "#4ade80"
                                                    : "#f87171"
                                        }}
                                    >

                                        {
                                            managerAttendance
                                                ? "Present"
                                                : "Not Marked"
                                        }

                                    </strong>

                                </p>

                            </div>
                        );
                    })
                }

            </div>




            {/* Employees */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    All Employees
                </h2>

                {
                    employees.map((emp) => {

                        const todayAttendance =
                            getTodayAttendance(emp._id);

                        return (

                            <div
                                key={emp._id}

                                style={cardStyle}
                            >

                                <h3>{emp.name}</h3>

                                <p>{emp.email}</p>

                                <p>

                                    Manager:
                                    {" "}

                                    {
                                        emp.managerId?.name
                                    }

                                </p>



                                <p>

                                    Today's Status:
                                    {" "}

                                    <strong
                                        style={{
                                            color:
                                                todayAttendance?.status === "Present"
                                                    ? "#4ade80"
                                                    : "#f87171"
                                        }}
                                    >

                                        {
                                            todayAttendance
                                                ? todayAttendance.status
                                                : "Not Marked"
                                        }

                                    </strong>

                                </p>

                            </div>
                        );
                    })
                }

            </div>




            {/* Tasks */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    All Tasks
                </h2>

                {
                    tasks.map((task) => (

                        <div
                            key={task._id}

                            style={cardStyle}
                        >

                            <h3>{task.title}</h3>

                            <p>
                                {task.description}
                            </p>

                            <p>

                                Assigned To:
                                {" "}

                                {
                                    task.assignedTo?.name
                                }

                            </p>



                            <p>

                                Status:
                                {" "}

                                <strong
                                    style={{
                                        color:
                                            task.status === "Completed"
                                                ? "#4ade80"
                                                : "#facc15"
                                    }}
                                >

                                    {task.status}

                                </strong>

                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}




const sectionStyle = {

    backgroundColor: "#1e293b",

    padding: "30px",

    borderRadius: "15px",

    marginBottom: "30px"
};




const inputStyle = {

    width: "100%",

    padding: "14px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "none",

    outline: "none",

    backgroundColor: "#334155",

    color: "white"
};




const buttonStyle = {

    padding: "14px 20px",

    backgroundColor: "#2563eb",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontSize: "16px"
};




const logoutButton = {

    padding: "12px 20px",

    backgroundColor: "#ef4444",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer"
};




const statsCard = {

    background:
        "linear-gradient(135deg, #1e293b, #334155)",

    padding: "30px",

    borderRadius: "15px",

    flex: 1
};




const cardStyle = {

    backgroundColor: "#334155",

    padding: "20px",

    borderRadius: "12px",

    marginBottom: "20px"
};




export default AdminDashboard;