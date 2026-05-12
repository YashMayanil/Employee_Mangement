import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";

import AdminDashboard from "../pages/AdminDashboard.jsx";

import ManagerDashboard from "../pages/ManagerDashboard.jsx";

import EmployeeDashboard from "../pages/EmployeeDashboard.jsx";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="/manager"
        element={<ManagerDashboard />}
      />

      <Route
        path="/employee"
        element={<EmployeeDashboard />}
      />

    </Routes>
  );
}

export default App;