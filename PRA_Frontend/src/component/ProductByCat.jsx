import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../css/productByCat.css";
import service from "../service/service";
import Cookies from "js-cookie";
import CartService from "../service/cartService.js";

export default function ProductByCat() {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    const type = Cookies.get("type") || "none";
    setUserType(type);
  }, []);

  

  useEffect(() => {
    setLoading(true);
    service
      .getProductBySubCat(subcategoryId)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [subcategoryId]);

  const addToCart = (product) => {

    const userId = Cookies.get("userid"); // ✅ always check latest
    if (!userId) {
      alert("Please login to add products to your cart!");
      navigate("/login");   // ✅ redirect to login
      return;
    }

    CartService.addToCarts(userId, product.product_id, 1)
      .then(() => {
        alert(`${product.product_name} added to cart!`);
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("Something went wrong while adding to cart.");
      });
  };

  if (loading) {
    return <h2 className="loading-text">Loading...</h2>;
  }

  if (products.length === 0) {
    return (
      <div className="empty-message">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No products"
        />
        <h3>No products found in this subcategory</h3>
        <p>Please try another category or check back later.</p>
      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <h2 className="page-title">Our Featured Products</h2>
      <div className="product-grid">
        {products.map((product, index) => {
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
                    <div className="original-price">
                      ₹{originalPrice.toFixed(2)}
                    </div>
                    <div className="discounted-price">
                      ₹{discountedPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="you-save">You save ₹{saved.toFixed(2)}</div>
                  <div className="unit">For {unitLabel}</div>
                </div>
              </a>

              <div className="product-actions">
                {userType === "admin" ? (
                  <>
                    <button className="update-btn">
                      ✏️ Update
                    </button>
                    <button className="delete-btn">
                      ❌ Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
