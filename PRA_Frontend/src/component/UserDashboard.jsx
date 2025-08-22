import React, { useEffect, useState } from "react";
import service from "../service/service";
// import cartService from "../service/cartService";
import Cookies from "js-cookie";

import Navbar from "./Navbar";
import SubCategoryBar from "./SubCategoryBar";
import Footer from "./Footer";
import HistoryProducts from "./HistoryProducts";
import Recommendations from "./Recommendations";
import CategorySection from "./CategorySection";

function UserDashboard() {
  const [historyProducts, setHistoryProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userid");
    if (!userId) {
      console.log("User not logged in");
      setLoading(false);
      return;
    }

    service
      .getCategory()
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error("Error fetching categories:", err));

    service
      .getSubCat()
      .then((res) => setSubcategories(res.data.subcategories || []))
      .catch((err) => console.error("Error fetching subcategories:", err));

    service
      .getUserHistory(userId)
      .then((res) => setHistoryProducts(res.data.products))
      .catch((err) => console.error("Error fetching history:", err));

    service
      .getRecommendations(userId)
      .then((res) => setRecommended(res.data))
      .catch((err) => console.error("Error fetching recommendations:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-text">Loading...</div>;

  return (
    <>
      <Navbar categories={categories} searchNavigate={true} />
      <SubCategoryBar subcategories={subcategories} />

      <div className="user-dashboard">
        <HistoryProducts historyProducts={historyProducts} />
        <Recommendations recommended={recommended} />
        <CategorySection
          categories={categories}
          subcategories={subcategories}
        />
      </div>

      <Footer />
    </>
  );
}

export default UserDashboard;
