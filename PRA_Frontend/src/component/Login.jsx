import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../css/login.css';

function Login() {
  return (
    <div className="login-main-container">
      <div className="login-container">
        <h2>Login</h2>

        {/* <div className="error-msg">{msg}</div> */}

        <form method='post'>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>User Type</label>
            <select name="type" className="form-control" required>
              <option value="">-- Select Type --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          
          <Link to="/adminDashboard">
              <button type="submit" className="btn btn-login">
                Login
              </button>
          </Link>

          <div className="bottom-text">
            Don't have an account?{" "}
            <Link to="/register">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
