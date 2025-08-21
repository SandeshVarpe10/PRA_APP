import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import "../css/productDetails.css";
import Cookies from "js-cookie";
import service from "../service/service";
import CartService from "../service/cartService.js";

const ProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Always get the latest cookies
  const userType = Cookies.get("type") || "none";
  
  useEffect(() => {
    setLoading(true);
    service.getProductById(product_id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [product_id]);

  const addToCart = (product) => {
    const userId = Cookies.get("userid"); // ✅ always get latest
    if (!userId) {
      alert("Please login to add products to your cart!");
      Cookies.set("redirectAfterLogin", window.location.pathname); // optional
      navigate("/login");
      return;
    }

    CartService.addToCart(userId, product.product_id, 1)
      .then(() => {
        alert(`${product.product_name} added to cart!`);
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("Something went wrong while adding to cart.");
      });
  };


  const handleDelete = (id) => {
          if (window.confirm("Are you sure you want to delete this product?")) {
            service
              .deleteProduct(id)
              .then(() => {
                setProduct(product.filter((p) => p.product_id !== id));
              })
              .catch((err) => {
                console.error("Error deleting product:", err);
              });
          }
  };


  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  // Price calculations
  const originalPrice = parseFloat(product.price);
  const discount = parseFloat(product.discount);
  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  // Unit label
  let unitLabel = "";
  if (product.stock_unit === "kilogram") unitLabel = "per kg";
  else if (product.stock_unit === "piece") unitLabel = "per piece";
  else if (product.stock_unit === "liter") unitLabel = "per litre";
  else unitLabel = "per unit";

  return (
    <>
      <br /><br />
      <h2 className="card-title">Product Details</h2>
      <div className="product-container">
        <img
          className="product-image"
          src={`http://localhost:3000/images/${product.product_image}`}
          alt={product.product_name}
        />

        <div className="product-details">
          <h2>{product.product_name}</h2>

          <div className="detail-row">
            <span className="label">Brand:</span>
            <span className="value">{product.brand}</span>
          </div>
          <div className="detail-row">
            <span className="label">Description:</span>
            <span className="value">{product.description}</span>
          </div>
          <div className="detail-row">
            <span className="label">Stock:</span>
            <span className="value">{product.stock} {product.stock_unit}</span>
          </div>
          <div className="detail-row">
            <span className="label">Stock Unit:</span>
            <span className="value">{product.stock_unit}</span>
          </div>
          <div className="detail-row">
            <span className="label">Discount:</span>
            <span className="value">{product.discount}%</span>
          </div>
          <div className="detail-row">
            <span className="label">Organic:</span>
            <span className="value">{product.organic === 1 ? "Yes" : "No"}</span>
          </div>

          <div className="price-section">
            <span className="original-price">₹{originalPrice.toFixed(2)}</span>
            <span className="final-price">₹{finalPrice.toFixed(2)}</span>
            <span className="unit">({unitLabel})</span>
          </div>

          {/* Conditional Buttons */}
          {userType === "admin" ? (
            <div className="d-flex gap-2">
              <Link
                  to={`/upd-product/${product.product_id}`}
                  className="subcat-btn update"
                >
                  ✏️ Update
                </Link>
                    <button
                      className="btn-delete"
                      onClick={() => {handleDelete(product.product_id)
                          navigate(`/products/${product.subcategory_id}`)
                      }}
                    >
                      🗑 Delete
                    </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
              🛒 Add to Cart
            </button>
          )}

          <button
            className="back-btn"
            onClick={() => navigate(`/products/${product.subcategory_id}`)}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
