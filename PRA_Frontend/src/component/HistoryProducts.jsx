import React from "react";
import ProductCard from "./ProductCard";
import "../css/productCard.css";

export default function HistoryProducts({ historyProducts }) {
  if (!historyProducts || historyProducts.length === 0)
    return <div>No recently viewed products</div>;

  return (
    <div className="history-products">
      <h2>Recently Viewed</h2>
      <div className="horizontal-scroll">
        {historyProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
