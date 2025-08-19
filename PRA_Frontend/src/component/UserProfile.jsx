import React from "react";

function UserProfile({ user }) {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Welcome, {user.name}!</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Type:</strong> {user.type}
        </p>

        {user.photo && (
          <img
            src={`/upload/${user.photo}`}
            alt="User"
            width="150"
            className="rounded-circle mt-3"
          />
        )}

        <a href="/logout" className="btn btn-danger mt-4">
          Logout
        </a>

        {user.type === "user" ? (
          <a href="/userProfile" className="btn btn-primary mt-2 ml-2">
            Go to Home
          </a>
        ) : user.type === "admin" ? (
          <a href="/adminDashboard" className="btn btn-primary mt-2 ml-2">
            Go to Home
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default UserProfile;
