import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar({ categories }) {
  const token = Cookies.get("token");
  const userType = Cookies.get("type"); 
  const navigate = useNavigate();

  // ✅ Search box वर click झाल्यावर redirect 
  const handleSearchClick = () => {
    navigate("/search-live");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-lg">
      <div className="container-fluid">
        <Link to={"/home"} className="logo">
          <img
            src="https://img.freepik.com/premium-photo/modern-logo-stylish-shopping-cart-icon_1108533-68784.jpg?semt=ais_hybrid&w=740"
            alt="Logo"
            width="40"
            height="40"
          />
          MyShop
        </Link>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-center mt-2 mt-lg-0">
            {/* ❌ Form काढून टाकलं */}
            <div className="d-flex navbar-center h">
              <select className="category-select me-2" name="category">
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>

              <input
                className="navbar-search"
                type="search"
                id="searchInput"
                placeholder="Search products..."
                aria-label="Search"
                onClick={handleSearchClick} // ✅ क्लिक करताच page बदलणार
              />
            </div>

            <div className="d-flex gap-3 right-btn">
              <Link to={"/cart"} className="cart-btn">
                <button className="btn cart-btn">Cart 🛒</button>
              </Link>

              {token && userType === "user" ? (
                <Link to={"/myprofile"}>
                  <button className="btn login-btn">My Profile</button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button className="btn login-btn">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
