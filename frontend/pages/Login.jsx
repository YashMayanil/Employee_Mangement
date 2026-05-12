import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);

            const role = res.data.user.role;

            if (role === "admin") {
                navigate("/admin");
            } else if (role === "manager") {
                navigate("/manager");
            } else {
                navigate("/employee");
            }
        } catch (error) {
            console.log("Login error:", error);
            const errorMessage =
                error.response?.data?.message || error.message || "Login failed";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            {error && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;