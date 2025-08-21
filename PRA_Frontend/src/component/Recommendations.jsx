import React from "react";
import ProductCard from "./ProductCard";
import "../css/productCard.css";

export default function Recommendations({ recommended }) {
  if (!recommended || recommended.length === 0)
    return <div>No recommendations available</div>;

  return (
    <div className="recommendations">
      <h2>Recommended for You</h2>
      <div className="horizontal-scroll">
        {recommended.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
