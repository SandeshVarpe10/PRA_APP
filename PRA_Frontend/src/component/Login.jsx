import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import service from "../service/service";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await service.getLoginResult(formData);
      if (response.data.success) {
        if (response.data.type === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/userDashboard");
        }
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <h2>Login</h2>

        {error && <div className="errormsg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>User Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button type="submit" className="btn btn-login">
            Login
          </button>

          <div className="bottom-text">
            Don't have an account? <a href="/register">Register now</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
