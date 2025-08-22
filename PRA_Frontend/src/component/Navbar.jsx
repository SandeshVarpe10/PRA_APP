import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar({ categories, searchNavigate = false,subcategoryId = null }) {
  console.log(subcategoryId);
  const token = Cookies.get("token");
  const userType = Cookies.get("type");
  const navigate = useNavigate();

  const handleSearch = (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();

    if (query.length === 0) {
      if (subcategoryId) {
        return;
      } else {
        navigate("/search-live");
        return;
      }
    }

    const url = subcategoryId
      ? `/search-live?subcategoryId=${subcategoryId}&query=${encodeURIComponent(query)}`
      : `/search-live?query=${encodeURIComponent(query)}`;

    navigate(url);
  }
};


  const handleSearchClick = () => {
    if (searchNavigate) {
      
      navigate("/search-live");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/home" className="navbar-brand d-flex align-items-center">
          <img
            src="https://img.freepik.com/premium-photo/modern-logo-stylish-shopping-cart-icon_1108533-68784.jpg?semt=ais_hybrid&w=740"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold">MyShop</span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Center Search */}
          <div className="mx-auto my-2 my-lg-0 d-flex">
            <select className="form-select me-2" style={{ width: "180px" }}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>

            <input
              className="form-control"
              type="search"
              id="searchInput"
              placeholder="Search products..."
              aria-label="Search"
              onKeyDown={handleSearch}
              onFocus={handleSearchClick}
            />
          </div>

          {/* Right Buttons */}
          <div className="ms-auto d-flex gap-2">
            <Link to="/cart">
              <button className="btn btn-outline-primary">Cart 🛒</button>
            </Link>

            {token ? (
              userType === "user" ? (
                <Link to="/myprofile">
                  <button className="btn btn-primary">My Profile</button>
                </Link>
              ) : (
                <Link to="/adminDashboard">
                  <button className="btn btn-warning">Dashboard</button>
                </Link>
              )
            ) : (
              <Link to="/login">
                <button className="btn btn-success">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
