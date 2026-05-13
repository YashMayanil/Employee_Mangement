import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);

    const [employee, setEmployee] = useState(null);

    const [tasks, setTasks] = useState([]);




    // Fetch attendance
    const fetchAttendance = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/attendance/me",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAttendance(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch profile
    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/auth/me",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEmployee(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Fetch tasks
    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/tasks/my-tasks",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error);
        }
    };




    // Update task status
    const updateTaskStatus = async (
        taskId,
        status
    ) => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(

                `http://localhost:5000/api/tasks/update-status/${taskId}`,

                {
                    status
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };




    // Mark attendance
    const markAttendance = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/attendance/mark-self",

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchAttendance();

        } catch (error) {

            console.log(error);
        }
    };




    // Logout
    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };




    useEffect(() => {

        fetchAttendance();

        fetchProfile();

        fetchTasks();

    }, []);




    // Today's attendance
    const today = new Date().toLocaleDateString();

    const todayAttendance = attendance.find((item) => {

        return (

            new Date(item.date)
                .toLocaleDateString() === today
        );
    });




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
                        Employee Dashboard
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
                                employee
                                    ? employee.name
                                    : "Employee"
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




            {/* Profile */}

            {
                employee && (

                    <div style={sectionStyle}>

                        <h2
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            My Profile
                        </h2>

                        <p>
                            <strong>Name:</strong>
                            {" "}
                            {employee.name}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            {" "}
                            {employee.email}
                        </p>

                        <p>
                            <strong>Role:</strong>
                            {" "}
                            {employee.role}
                        </p>

                    </div>
                )
            }




            {/* Today's Attendance */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Today's Attendance
                </h2>

                {
                    todayAttendance ? (

                        <div
                            style={{
                                backgroundColor:
                                    todayAttendance.status === "Present"
                                        ? "#14532d"
                                        : "#7f1d1d",

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
                                            todayAttendance.status === "Present"
                                                ? "#4ade80"
                                                : "#f87171"
                                    }}
                                >

                                    {
                                        todayAttendance.status
                                    }

                                </span>

                            </h3>

                        </div>

                    ) : (

                        <button
                            onClick={markAttendance}

                            style={presentButton}
                        >
                            Mark Present
                        </button>
                    )
                }

            </div>




            {/* Tasks */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    My Tasks
                </h2>

                {
                    tasks.length === 0 ? (

                        <p>No Tasks Assigned</p>

                    ) : (

                        tasks.map((task) => (

                            <div
                                key={task._id}

                                style={cardStyle}
                            >

                                <h3>
                                    {task.title}
                                </h3>

                                <p>
                                    {task.description}
                                </p>



                                <p>

                                    Assigned By:
                                    {" "}

                                    {
                                        task.assignedBy?.name
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

                                                    : task.status === "In Progress"
                                                        ? "#38bdf8"

                                                        : "#facc15"
                                        }}
                                    >

                                        {task.status}

                                    </strong>

                                </p>



                                {/* Update Status */}

                                <div
                                    style={{
                                        marginTop: "15px"
                                    }}
                                >

                                    <button
                                        onClick={() =>
                                            updateTaskStatus(
                                                task._id,
                                                "Pending"
                                            )
                                        }

                                        style={pendingButton}
                                    >
                                        Pending
                                    </button>



                                    <button
                                        onClick={() =>
                                            updateTaskStatus(
                                                task._id,
                                                "In Progress"
                                            )
                                        }

                                        style={progressButton}
                                    >
                                        In Progress
                                    </button>



                                    <button
                                        onClick={() =>
                                            updateTaskStatus(
                                                task._id,
                                                "Completed"
                                            )
                                        }

                                        style={completeButton}
                                    >
                                        Completed
                                    </button>

                                </div>

                            </div>
                        ))
                    )
                }

            </div>




            {/* Attendance History */}

            <div style={sectionStyle}>

                <h2
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    Attendance History
                </h2>

                {
                    attendance.map((item) => (

                        <div
                            key={item._id}

                            style={cardStyle}
                        >

                            <p>

                                <strong>Date:</strong>
                                {" "}

                                {
                                    new Date(
                                        item.date
                                    ).toLocaleDateString()
                                }

                            </p>



                            <span
                                style={{
                                    padding:
                                        "8px 15px",

                                    borderRadius:
                                        "20px",

                                    backgroundColor:
                                        item.status === "Present"
                                            ? "#22c55e"
                                            : "#ef4444"
                                }}
                            >

                                {item.status}

                            </span>

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




const cardStyle = {

    backgroundColor: "#334155",

    padding: "20px",

    borderRadius: "12px",

    marginBottom: "20px"
};




const logoutButton = {

    padding: "12px 20px",

    backgroundColor: "#ef4444",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer"
};




const presentButton = {

    padding: "12px 20px",

    backgroundColor: "#22c55e",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer"
};




const pendingButton = {

    padding: "10px 15px",

    backgroundColor: "#facc15",

    color: "black",

    border: "none",

    borderRadius: "8px",

    marginRight: "10px",

    cursor: "pointer"
};




const progressButton = {

    padding: "10px 15px",

    backgroundColor: "#38bdf8",

    color: "white",

    border: "none",

    borderRadius: "8px",

    marginRight: "10px",

    cursor: "pointer"
};




const completeButton = {

    padding: "10px 15px",

    backgroundColor: "#22c55e",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer"
};




export default EmployeeDashboard;