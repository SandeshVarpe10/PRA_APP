import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
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
                <Link to="/privacy" className="text-light text-decoration-none">
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
  );
}

export default Footer;
