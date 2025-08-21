import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/adminDashboard.css";
import service from "../service/service";

function AdminDashboard() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate=useNavigate();

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    service.getAdminProfile()
      .then((res) => {
        if (res.data.success) {
          setUser(res.data);
        } else {
          setError(res.data.message || "Failed to load profile");
        }
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setError("Something went wrong!");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    service.handleLogout()
      .then(() => {
        alert("Admin Logout successfully")
        navigate("/login"); 
      })
      .catch(err => console.error(err));
  };
  return (
    <div className="admin-dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center text-white fw-bold fs-4">
            <img
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-cart-ecommerce-flatart-icons-outline-flatarticons.png"
              width="40"
              height="40"
              className="me-2"
              alt="logo"
            />
            MyShop Admin
          </Link>
          <div className="ms-auto">
            <button 
  onClick={() => setShowProfile(true)} 
  className="myprofile-btn">
  My Profile
</button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="d-flex">
        
        {/* Sidebar */}
        <div className="sidebar text-white p-3 shadow-sm">
          <h5 className="mb-4 text-uppercase fw-bold">📊 Dashboard Menu</h5>
          
          {/* Product Management */}
          <div className="sidebar-item">
            <div className="sidebar-link" onClick={() => toggleDropdown("product")}>
              🛒 Product Management
            </div>
            {openDropdown === "product" && (
              <div className="sidebar-dropdown">
                <Link to="/add-product" className="dropdown-item">➕ Add Product</Link>
                <Link to="/view-product" className="dropdown-item">📦 View Products</Link>
              </div>
            )}
          </div>

          {/* Category Management */}
          <div className="sidebar-item">
            <div className="sidebar-link" onClick={() => toggleDropdown("category")}>
              📂 Category Management
            </div>
            {openDropdown === "category" && (
              <div className="sidebar-dropdown">
                <Link to="/add-category" className="dropdown-item">➕ Add Category</Link>
                <Link to="/view-category" className="dropdown-item">📁 View Categories</Link>
              </div>
            )}
          </div>

          {/* Customer Management */}
          <div className="sidebar-item">
            <div className="sidebar-link" onClick={() => toggleDropdown("customer")}>
              👤 Customer Management
            </div>
            {openDropdown === "customer" && (
              <div className="sidebar-dropdown">
                <Link to="/get-users" className="dropdown-item">👥 View Customers</Link>
              </div>
            )}
          </div>

          {/* Admin Management */}
          <div className="sidebar-item">
            <div className="sidebar-link" onClick={() => toggleDropdown("admin")}>
              👤 Admin Management
            </div>
            {openDropdown === "admin" && (
              <div className="sidebar-dropdown">
                <Link to="/admin-customers" className="dropdown-item">👥 View Admins</Link>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow-1 p-5">
          <h2 className="fw-bold">Welcome to the Admin Dashboard 🚀</h2>
          <p className="text-muted fs-5">
            Select an option from the sidebar to manage products, categories, customers, or admins.
          </p>
        </div>
      </div>

      {/* Profile Drawer */}
      {showProfile && (
        <>
          {/* Black Overlay */}
          <div className="overlay" onClick={() => setShowProfile(false)}></div>

          {/* Sliding Profile */}
          <div className="profile-drawer">
            <button 
              className="btn btn-sm close-btn"
              onClick={() => setShowProfile(false)}>
              ❌
            </button>

            {/* Integrated Profile */}
           {/* Integrated Profile */}
{loading ? (
  <p>Loading profile...</p>
) : error ? (
  <p style={{ color: "red" }}>{error}</p>
) : (
  <div className="profile-section">
    <div className="profile-header">
      <img
        src={user.photo ? `http://localhost:3000/images/${user.photo}` : "/default.jpg"}
        alt="Profile"
        className="profile-photo-large"
      />
      <div className="profile-info">
    
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        
        <p>Role: {user.type}</p>
      </div>
    </div>

    

    {/* ✅ New Buttons Added Here */}
   <div className="profile-actions">
  {/* Edit Profile */}
  <Link to={`/edit-profile/${user.id}`} className="btn btn-primary">✏️ Edit Profile</Link>

  {/* Logout */}
  <button onClick={handleLogout} className="btn btn-danger">
      🚪 Logout
    </button>
</div>
  </div>
)}


          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
