import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Cookies from "js-cookie";
import service from "../service/service";
import ProductCard from "./ProductCard";
import "../css/productByCat.css";

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

  if (loading) return <h2 className="loading-text">Loading...</h2>;

  if (products.length === 0)
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

  return (
    <div>
      <h2 className="page-title m-5">Our Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.product_id} initialProduct={product} userType={userType} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}
