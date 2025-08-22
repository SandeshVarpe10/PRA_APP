import React, { useEffect, useState } from "react";
import "../css/home.css";
import Service from "../service/service.js";
import Navbar from "./Navbar";
import SubCategoryBar from "./SubCategoryBar";
import Footer from "./Footer";
import CategorySection from "./CategorySection";

function Home() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    Service.getCategory()
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error("Error fetching data:", err));

    Service.getSubCat()
      .then((res) => setSubcategories(res.data.subcategories || []))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      <Navbar categories={categories} searchNavigate={true} />
      <SubCategoryBar subcategories={subcategories} />
      <CategorySection categories={categories} subcategories={subcategories} />
      <Footer />
    </>
  );
}

export default Home;