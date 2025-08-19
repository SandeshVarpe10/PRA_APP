import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/productDetails.css";
import service from "../service/service";

const ProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    service.getProductById(product_id)
      .then((res) => {
        setProduct(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [product_id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const originalPrice = parseFloat(product.price);
  const discount = parseFloat(product.discount);
  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;

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
          <span className="value">
            {product.stock} {product.stock_unit}
          </span>
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

        <div className="buttons">
          <button
            className="btn btn-update"
            onClick={() => navigate(`/updateProduct/${product.product_id}`)}
          >
            Update
          </button>
          <button
            className="btn btn-delete"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this product?")) {
                navigate(`/deleteProduct/${product.product_id}`);
              }
            }}
          >
            Delete
          </button>
        </div>

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
