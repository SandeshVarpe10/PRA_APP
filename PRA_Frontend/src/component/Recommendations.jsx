import React from "react";

function Recommendations({ recommended, renderProductCard }) {
  return (
    <section>
      <h3>Recommended for You</h3>
      <div className="product-grid">
        {recommended.length > 0
          ? recommended.map((p, i) => renderProductCard(p, i))
          : <p>No recommendations yet.</p>}
      </div>
    </section>
  );
}

export default Recommendations;
