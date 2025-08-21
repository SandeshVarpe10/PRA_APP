import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Service from "../service/service";
import Cookies from "js-cookie";
import ProductCard from "./ProductCard"; // ✅ import ProductCard
import "../css/SearchPage.css";

function SearchPage() {
  const [categories, setCategories] = useState([]);
  const [historyProducts, setHistoryProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const userId = Cookies.get("userid");
  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch categories
    Service.getCategory()
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error(err));

    // Fetch user search history
    if (userId && token) {
      Service.getUserHistory(userId)
        .then((res) => setHistoryProducts(res.data.products || []))
        .catch((err) => console.error(err));
    }

    // Fetch search results if query exists
    if (query) {
      Service.searchProducts(query)
        .then((res) => setSearchResults(res.data.pro || []))
        .catch((err) => console.error(err));
    }
  }, [query, userId, token]);

  return (
    <>
      <Navbar categories={categories} />

      {/* Recent Searches */}
      {!query && historyProducts.length > 0 && (
        <div className="recent-container">
          <h3 className="recent-title">Recent Searches</h3>
          <div className="recent-buttons">
            {historyProducts.map((p) => (
              <button
                key={p.product_id}
                className="recent-btn"
                onClick={() => navigate(`/search-live?query=${p.product_name}`)}
              >
                {p.product_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {query && (
        <div className="recent-products">
          <h3 className="recent-title">Search Results for "{query}"</h3>
          <div className="product-grid">
            {searchResults.length > 0 ? (
              searchResults.map((p) => <ProductCard key={p.product_id} product={p} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      )}

      {/* History Products Fallback */}
      {!query && historyProducts.length > 0 && (
        <div className="recent-products">
          <h3 className="recent-title">Products from your searches</h3>
          <div className="product-grid">
            {historyProducts.map((p) => (
              <ProductCard key={p.product_id} product={p} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default SearchPage;
