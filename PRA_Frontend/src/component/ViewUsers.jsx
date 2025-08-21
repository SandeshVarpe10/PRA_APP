import React, { useEffect, useState } from "react";
import service from "../service/service"; // adjust path as needed
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    service
      .getAllUsers()
      .then((res) => {
        setUsers(res.data.result); 
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        service.deleteUser(id)
          .then((res) => {
            setMsg(res.data.msg || "User deleted successfully!");
            setUsers((prev) => prev.filter((user) => user.id !== id));
          })
          .catch(() => setMsg("Error deleting user!"));
      }
  };

  return (
    <div className="container-fluid my-5 px-5">
      {msg && <div className="alert alert-info">{msg}</div>}
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
                  <th>Password</th>
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
                      <td>{user.password}</td>
                      <td>{user.age}</td>
                      <td>
                        {user.photo ? (
                          <img
                            src={`http://localhost:3000/images/${user.photo}`} 
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
                      <td><button className="btn-sm border-0 btn-danger" onClick={()=>handleDelete(user.id)}>delete</button></td>
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
