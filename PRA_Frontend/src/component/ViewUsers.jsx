import React, { useEffect, useState } from "react";
import service from "../service/service"; // adjust path as needed
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    service
      .getAllUsers()
      .then((res) => {
        setUsers(res.data.result); // ensure backend sends { result: [...] }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <h2 className="card-header text-dark text-center rounded-top-4">
          Users List
        </h2>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Photo</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td className="fw-semibold">{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        {user.photo ? (
                          <img
                            src={`http://localhost:3000/uploads/${user.photo}`} // adjust path
                            alt={user.name}
                            className="rounded-circle"
                            width="50"
                            height="50"
                          />
                        ) : (
                          <span className="text-muted">No Photo</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            user.type === "admin"
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                        >
                          {user.type}
                        </span>
                      </td>
                      <td><button className="btn-sm border-0 btn-danger" onClick={""}>delete</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted py-4">
                      🚫 No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
