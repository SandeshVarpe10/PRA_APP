import React, { useEffect, useState } from "react";
import service from "../service/service";
import cartService from "../service/cartService";
import Cookies from "js-cookie";
import "../css/productByCat.css";

import Navbar from "./Navbar";
import SubCategoryBar from "./SubCategoryBar";
import Footer from "./Footer";
import CategorySection from "./CategorySection";
import HistoryProducts from "./HistoryProducts";
import Recommendations from "./Recommendations";

function UserDashboard() {
  const [historyProducts, setHistoryProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userid");

    if (!userId) {
      console.log("User not logged in");
      setLoading(false);
      return;
    }

    // 📌 Categories & SubCategories for Navbar + Section
    service.getCategory()
      .then(res => setCategories(res.data.categories || []))
      .catch(err => console.error("Error fetching categories:", err));

    service.getSubCat()
      .then(res => setSubcategories(res.data.subcategories || []))
      .catch(err => console.error("Error fetching subcategories:", err));

    // 📌 History
    service.getUserHistory(userId)
      .then(res => setHistoryProducts(res.data.products))
      .catch(err => console.error("Error fetching history:", err));

    // 📌 Recommendations
    service.getRecommendations(userId)
      .then(res => setRecommended(res.data))
      .catch(err => console.error("Error fetching recommendations:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-text">Loading...</div>;

  // 🛒 Add to Cart Function
  const handleAddToCart = async (productId) => {
    const userId = Cookies.get("userid");
    if (!userId) {
      alert("Please login to add items to cart.");
      return;
    }

    try {
      await cartService.addToCart(userId, productId, 1);
      alert("✅ Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("❌ Failed to add to cart.");
    }
  };

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
      <div
        key={product.product_id}
        className={`product-card ${index === 0 ? "highlight-card" : ""}`}
      >
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

        {/* 🛒 Add to Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product.product_id)}
        >
          🛒 Add to Cart
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar categories={categories} />
      <SubCategoryBar subcategories={subcategories} />

      <div className="user-dashboard">
        

        <HistoryProducts
          historyProducts={historyProducts}
          renderProductCard={renderProductCard}
        />

        <Recommendations
          recommended={recommended}
          renderProductCard={renderProductCard}
        />

        <CategorySection
          categories={categories}
          subcategories={subcategories}
        />
      </div>

      <Footer />
    </>
  );
}

export default UserDashboard;
