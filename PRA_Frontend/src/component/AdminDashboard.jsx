import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/adminDashboard.css";

function AdminDashboard() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom shadow-sm">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center text-white">
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
            <Link to="/user-profile" className="btn text-bg-light">
              My Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="d-flex">
        
        {/* Sidebar */}
        <div className="sidebar text-white p-3">
          <h5 className="mb-4">📊 Dashboard Menu</h5>
          
          {/* Product Management */}
          <div className="sidebar-item">
            <div
              className="sidebar-link"
              onClick={() => toggleDropdown("product")}
            >
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
            <div
              className="sidebar-link"
              onClick={() => toggleDropdown("category")}
            >
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
            <div
              className="sidebar-link"
              onClick={() => toggleDropdown("customer")}
            >
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
            <div
              className="sidebar-link"
              onClick={() => toggleDropdown("admin")}
            >
              👤 Admin Management
            </div>
            {openDropdown === "admin" && (
              <div className="sidebar-dropdown">
                <Link to="/admin-customers" className="dropdown-item">👥 View admins</Link>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow-1 p-4">
          <h3>Welcome to the Admin Dashboard</h3>
          <p>Select an option from the sidebar to manage products, categories, customers, or admins.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
