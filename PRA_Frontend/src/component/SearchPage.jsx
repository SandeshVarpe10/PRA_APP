import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Service from "../service/service";
import Cookies from "js-cookie";
import "../css/SearchPage.css";

function SearchPage() {
  const [categories, setCategories] = useState([]);
  const [historyProducts, setHistoryProducts] = useState([]);

  useEffect(() => {
    const userId = Cookies.get("userid");

    Service.getCategory()
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error("Error fetching categories:", err));

    Service.getUserHistory(userId)
      .then((res) => {
        console.log("ppp response:", res.data.products);
        setHistoryProducts(res.data.products || []);
      })
      .catch((err) => console.error("Error fetching recent searches:", err));
  }, []);

  // ✅ Card UI function
  const renderProductCard = (product, index) => {
    const originalPrice = parseFloat(product.price);
    const discountPercent = parseFloat(product.discount);
    const saved = (originalPrice * discountPercent) / 100;
    const discountedPrice = originalPrice - saved;
    const unitLabel =
      product.stock_unit === "kilogram"
        ? "1 kg"
        : product.stock_unit === "piece"
        ? "1 pc"
        : product.stock_unit === "liter"
        ? "1 ltr"
        : "1 unit";

    return (
      <div key={product.product_id} className="product-card">
        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}

        <a
          href={`/product/${product.product_id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            className="product-img"
            src={`http://localhost:3000/images/${product.product_image}`}
            alt={product.product_name}
          />
          <div className="product-info">
            <div className="product-name">{product.product_name}</div>
            <div className="price-box">
              <div className="original-price">₹{originalPrice.toFixed(2)}</div>
              <div className="discounted-price">₹{discountedPrice.toFixed(2)}</div>
            </div>
            <div className="you-save">You save ₹{saved.toFixed(2)}</div>
            <div className="unit">For {unitLabel}</div>
          </div>
        </a>

        <button className="add-to-cart-btn">
          🛒 Add to Cart
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar categories={categories} />

      {/* 🔹 Recent Searches Section */}
      <div className="recent-container">
        <h3 className="recent-title">Recent Searches</h3>
        <div className="recent-buttons">
          {historyProducts.map((p) => (
            <button
              key={p.product_id}
              className="recent-btn"
              onClick={() => console.log("Clicked:", p.product_name)}
            >
              {p.product_name}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Recent Search Products (Cards under buttons) */}
      <div className="recent-products">
        <h3 className="recent-title">Products from your searches</h3>
        <div className="product-grid">
          {historyProducts.map((p, index) => renderProductCard(p, index))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SearchPage;
