import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/viewProduct.css";
import service from "../service/service";

export default function ViewProducts() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    service.getProduct()
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.categories);
          setSubcategories(res.data.subcategories);
        } else {
          console.error("Failed to load data:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="view-products">
      <h2>All Categories & Subcategories</h2>

      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.category_name}</h3>
          <div className="subcategory-container">
            {subcategories
              .filter((sub) => sub.category_id === category.id)
              .map((sub) => (
                <Link to={`/products/${sub.subcategory_id}`} key={sub.subcategory_id}>
                  <div className="subcategory-card">
                    <img src={`/images/${sub.image}`} alt={sub.subcategory_name} />
                    <h4>{sub.subcategory_name}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
