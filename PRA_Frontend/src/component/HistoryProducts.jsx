import React from "react";

function HistoryProducts({ historyProducts, renderProductCard }) {
  return (
    <section>
      <h3>Your History</h3>
      <div className="product-grid">
        {historyProducts.length > 0
          ? historyProducts.map((p, i) => renderProductCard(p, i))
          : <p>No history found.</p>}
      </div>
    </section>
  );
}

export default HistoryProducts;
