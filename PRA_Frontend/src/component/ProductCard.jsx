import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import cartService from "../service/cartService";
import "../css/productCard.css";
import service from "../service/service";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const userType = Cookies.get("type");

  const handleAddToCart = async () => {
    const userId = Cookies.get("userid");
    if (!userId) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }
    try {
      await cartService.addToCart(userId, product.product_id, 1);
      alert(`${product.product_name} added to cart! `);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    await service.deleteProduct(id);
    alert("Product deleted successfully!");
    window.location.reload(); 
  } catch (err) {
    console.error("Error deleting product:", err);
    alert("Failed to delete product.");
  }
};

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
      className="product-card horizontal-card mb-4"
      onClick={() => navigate(`/product/${product.product_id}`)}
    >
      <img
        className="product-img"
        src={`http://localhost:3000/images/${product.product_image}`}
        alt={product.product_name}
      />

      <div className="product-info" onClick={(e) => e.stopPropagation()}>
        <div className="product-name">{product.product_name}</div>

        <div className="price-box">
          <div className="original-price">₹{originalPrice.toFixed(2)}</div>
          <div className="discounted-price">₹{discountedPrice.toFixed(2)}</div>
        </div>

        <div className="you-save">You save ₹{saved.toFixed(2)}</div>
        <div className="unit">For {unitLabel}</div>

        <div className="product-actions d-flex justify-content-center">
          {userType === "admin" ? (
            <>
              <Link
                to={`/upd-product/${product.product_id}`}
                className="subcat-btn update"
              >
                ✏ Update
              </Link>
              <button
                className="btn-delete"
                onClick={() => handleDelete(product.product_id)}
              >
                🗑 Delete
              </button>
            </>
          ) : (
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          )}
        </div>
      </div>

      {discountPercent > 0 && (
        <div className="discount-badge">{discountPercent}% OFF</div>
      )}
    </div>
  );
};

export default ProductCard;
