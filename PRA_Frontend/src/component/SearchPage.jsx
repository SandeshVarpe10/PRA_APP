import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Service from "../service/service";
import Cookies from "js-cookie";
import ProductCard from "./ProductCard"; 
import HistoryProducts from "./HistoryProducts";
import Recommendations from "./Recommendations";
import CategorySection from "./CategorySection";
import "../css/SearchPage.css";

function SearchPage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [historyProducts, setHistoryProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const subcategoryId = queryParams.get("subcategoryId") || "";
  const userId = Cookies.get("userid");
  const token = Cookies.get("token");

  useEffect(() => {
    // Category आणि Subcategory हे नेहमी fetch करायचे
    Service.getCategory()
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error(err));

    Service.getSubCat()
      .then((res) => setSubcategories(res.data.subcategories || []))
      .catch((err) => console.error(err));

    if (token && userId) {
      // User history
      Service.getUserHistory(userId)
        .then((res) => setHistoryProducts(res.data.products || []))
        .catch((err) => console.error(err));

      // Recommendations
      Service.getRecommendations(userId)
        .then((res) => setRecommended(res.data || []))
        .catch((err) => console.error(err));
    }

    // Search results
    if (query) {
      if (subcategoryId) {
        Service.searchProductsBySubcategory(query, subcategoryId)
          .then((res) => setSearchResults(res.data.pro || []))
          .catch((err) => console.error(err));
      } else {
        
        Service.searchProducts(query)
          .then((res) => {
            // console.log(res.data);
            setSearchResults(res.data.pro || [])
          })
          .catch((err) => console.error(err));
      }
    }

    setLoading(false);
  }, [query, userId, token, subcategoryId]);

  if (loading) return <div className="loading-text">Loading...</div>;

  return (
    <>
      <Navbar 
        categories={categories} 
        searchNavigate={!subcategoryId && !query} 
        subcategoryId={subcategoryId}
      />

      {/* Search Results */}
      {query && (
        <div className="search-results">
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

      {/* ✅ Token असेल */}
      {token && !query && (
        <>
          {/* Recent Searches */}
          {historyProducts.length > 0 && (
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

          <HistoryProducts historyProducts={historyProducts} />
          <Recommendations recommended={recommended} />
          <CategorySection categories={categories} subcategories={subcategories} />
        </>
      )}

      {/* ❌ Token नसेल */}
      {!token && !query && (
        <CategorySection categories={categories} subcategories={subcategories} />
      )}

      <Footer />
    </>
  );
}

export default SearchPage;