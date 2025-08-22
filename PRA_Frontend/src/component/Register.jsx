import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/register.css";
import service from "../service/service";

function Register({ msg }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    photo: null,
    created_at: new Date().toLocaleString(),
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData object तयार कर
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("photo", formData.photo); //  photo file
    formDataToSend.append("created_at", formData.created_at);

    const response = await service.getRegisterResult(formDataToSend);

    if (response.data.success) {
      navigate("/userDashboard");
    } else {
      console.error(
        "Registration Failed:",
        response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              min="1"
              required
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {/* Photo */}
          <div className="form-group">
            <label>Upload Profile Photo</label>
            <input
              type="file"
              name="photo"
              className="form-control-file"
              onChange={handleChange}
            />
          </div>

          {/* Created At */}
          <div className="form-group">
            <label>Created At</label>
            <input
              type="text"
              name="created_at"
              className="form-control"
              readOnly
              value={formData.created_at}
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn-register">
            Register
          </button>

          <p className="bottom-text">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>

        {msg && <p className="error--msg">{msg}</p>}
      </div>
    </div>
  );
}

export default Register;
