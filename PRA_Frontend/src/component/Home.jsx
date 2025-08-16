import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import Service from "../service/service.js";

function Home() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    Service.getCategory()
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch((err) => console.error("Error fetching data:", err));

      Service.getSubCat()
      .then((res) => {
        setSubcategories(res.data.subcategories || []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  return (
    <>
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

          <div class="collapse navbar-collapse" id="navbarContent">
            <div class="navbar-center mt-2 mt-lg-0">
              <form
                action="/search-live"
                method="GET"
                class="d-flex navbar-center mt-2 mt-lg-0"
              >
                <select
      className="category-select me-2"
      name="category"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.category_name}
        </option>
      ))}
    </select>

                <input
                  class="navbar-search"
                  type="search"
                  id="searchInput"
                  placeholder="Search products..."
                  aria-label="Search"
                />
              </form>
              <div className="d-flex gap-3 right-btn">
                  <Link to={"/login"} className="">
                    <button class="btn login-btn">Login</button>
                  </Link>
                  <Link to={"/cart"} className="cart-btn">
                    <button class="btn cart-btn">Cart🛒</button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="category-bar d-flex ">
        {subcategories.length > 0 ? (
          subcategories.map((cat) => (
            <button key={cat.subcategory_name} className="category-button">
              <i className="bi bi-tag-fill"></i> {cat.subcategory_name}
            </button>
          ))
        ) : (
          <div className="text-muted">No Categories Found</div>
        )}
      </div>
      <br />

      {/* Categories */}
      <h2>All Categories & Subcategories</h2>

      <h3 id="searchRes" className="searchResult">
        Search Results
      </h3>
      <div id="searchResults" className="subcategory-container"></div>

      <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.category_name}</h3>
          <div className="subcategory-container">
            {subcategories
              .filter((sub) => sub.category_id === category.id)
              .map((sub) => (
                <a key={sub.subcategory_id} href={`/products/${sub.subcategory_id}`}>
                  <div className="subcategory-card">
                    <img
                      src={`/public/shanghai.jpg`}
                      alt={sub.subcategory_name}
                    />
                    <h4>{sub.subcategory_name}</h4>
                  </div>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>

      {/* Footer */}
      <footer className="bg-dark text-light pt-5 mt-5">
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-4 row-in">
              <h5>MyShop</h5>
              <p>
                Pune, Maharashtra ,India
                <br />
              </p>
              <p>
                📞 +91 9999999999
                <br />
                📧 support@myshop.com
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 row-in">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/about" className="text-light text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-light text-decoration-none"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-light text-decoration-none">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-light text-decoration-none"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 d row-in">
              <h5>Follow Us</h5>
              <div className="sm-logo">
                <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-light me-3 fs-4"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-light me-3 fs-4"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-light me-3 fs-4"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-4"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              </div>
            </div>
          </div>

          <div className="text-center py-3 border-top border-secondary mt-3">
            ©2025 MyShop. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
