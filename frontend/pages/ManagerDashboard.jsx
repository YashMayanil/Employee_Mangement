import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function ManagerDashboard() {

    const navigate = useNavigate();

    const [manager, setManager] = useState(null);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [employees, setEmployees] = useState([]);

    const [attendance, setAttendance] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [managerAttendance,
    setManagerAttendance] = useState(null);




    // Task states
    const [taskTitle, setTaskTitle] = useState("");

    const [taskDescription,
    setTaskDescription] = useState("");

    const [selectedEmployee,
    setSelectedEmployee] = useState("");




    // Fetch manager profile
    const fetchManagerProfile =
    async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/auth/me",

                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setManager(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch employees
    const fetchEmployees = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/manager/employees",

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




    // Fetch employee attendance
    const fetchAttendance =
    async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/attendance/manager",

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




    // Fetch manager attendance
    const fetchManagerAttendance =
    async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/attendance/my-attendance",

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setManagerAttendance(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch tasks
    const fetchTasks = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/tasks/manager-tasks",

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

        fetchManagerProfile();

        fetchEmployees();

        fetchAttendance();

        fetchTasks();

        fetchManagerAttendance();

    }, []);




    // Create employee
    const createEmployee =
    async (e) => {

        e.preventDefault();

        try {

            const token =
            localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/manager/create-employee",

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

            alert("Employee Created");

            setName("");

            setEmail("");

            setPassword("");

            fetchEmployees();

        } catch (error) {

            console.log(error);
        }
    };




    // Assign task
    const assignTask = async (e) => {

        e.preventDefault();

        try {

            const token =
            localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/tasks/manager/create",

                {
                    title: taskTitle,

                    description:
                    taskDescription,

                    assignedTo:
                    selectedEmployee
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

            setSelectedEmployee("");

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };




    // Logout
    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };




    // Mark employee attendance
    const markAttendance =
    async (
        employeeId,
        status
    ) => {

        try {

            const token =
            localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/attendance/mark",

                {
                    employeeId,
                    status
                },

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            fetchAttendance();

        } catch (error) {

            console.log(error);
        }
    };




    // Mark manager attendance
    const markManagerAttendance =
    async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.post(

                "http://localhost:5000/api/attendance/mark-manager",

                {},

                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);

            fetchManagerAttendance();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message
            );
        }
    };




    // Check employee attendance
    const getTodayAttendance =
    (employeeId) => {

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
                    justifyContent:
                    "space-between",
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
                        Manager Dashboard
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "18px"
                        }}
                    >

                        Welcome,
                        {" "}

                        <span
                            style={{
                                color: "#4ade80",
                                fontWeight: "bold"
                            }}
                        >

                            {
                                manager?.name
                                ? manager.name
                                : "Manager"
                            }

                        </span>

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

                    <h2>Total Employees</h2>

                    <h1 style={statsNumber}>
                        {employees.length}
                    </h1>

                </div>

            </div>




            {/* Manager Attendance */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    My Attendance
                </h2>

                {
                    (() => {
                        const today = new Date().toLocaleDateString();
                        const todayAttendance = managerAttendance?.find(
                            (att) => new Date(att.date).toLocaleDateString() === today
                        );
                        
                        return todayAttendance ? (

                            <div
                                style={{
                                    backgroundColor:
                                    "#14532d",

                                    padding: "20px",

                                    borderRadius: "12px"
                                }}
                            >

                                <h3>

                                    Status:
                                    {" "}

                                    <span
                                        style={{
                                            color:
                                            "#4ade80"
                                        }}
                                    >
                                        Present
                                    </span>

                                </h3>

                            </div>

                        ) : (

                            <button
                                onClick={
                                    markManagerAttendance
                                }

                                style={presentButton}
                            >
                                Mark Present
                            </button>
                        );
                    })()
                }

            </div>




            {/* Create Employee */}

            <div style={sectionStyle}>

                <h2>Create Employee</h2>

                <form onSubmit={createEmployee}>

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
                        Create Employee
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
                    Assign Task To Employee
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
                        value={selectedEmployee}

                        onChange={(e) =>
                            setSelectedEmployee(
                                e.target.value
                            )
                        }

                        style={inputStyle}
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {
                            employees.map((emp) => (

                                <option
                                    key={emp._id}

                                    value={emp._id}
                                >
                                    {emp.name}
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




            {/* Employees */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    My Employees
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



                                {
                                    todayAttendance ? (

                                        <p>

                                            Today's Status:
                                            {" "}

                                            <strong
                                                style={{
                                                    color:
                                                    todayAttendance.status === "Present"
                                                    ? "#4ade80"
                                                    : "#f87171"
                                                }}
                                            >

                                                {
                                                    todayAttendance.status
                                                }

                                            </strong>

                                        </p>

                                    ) : (

                                        <div
                                            style={{
                                                marginTop:
                                                "15px"
                                            }}
                                        >

                                            <button
                                                onClick={() =>
                                                    markAttendance(
                                                        emp._id,
                                                        "Present"
                                                    )
                                                }

                                                style={presentButton}
                                            >
                                                Present
                                            </button>



                                            <button
                                                onClick={() =>
                                                    markAttendance(
                                                        emp._id,
                                                        "Absent"
                                                    )
                                                }

                                                style={absentButton}
                                            >
                                                Absent
                                            </button>

                                        </div>
                                    )
                                }

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
                    Employee Tasks
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
                                        task.status ===
                                        "Completed"
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

    cursor: "pointer"
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




const statsNumber = {

    fontSize: "70px",

    color: "#4ade80"
};




const cardStyle = {

    backgroundColor: "#334155",

    padding: "20px",

    borderRadius: "12px",

    marginBottom: "20px"
};




const presentButton = {

    padding: "10px 18px",

    backgroundColor: "#22c55e",

    color: "white",

    border: "none",

    borderRadius: "8px",

    marginRight: "10px",

    cursor: "pointer"
};




const absentButton = {

    padding: "10px 18px",

    backgroundColor: "#ef4444",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer"
};




export default ManagerDashboard;