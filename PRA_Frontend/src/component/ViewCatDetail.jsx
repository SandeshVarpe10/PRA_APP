import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Service from "../service/service"; // your API service
import "../css/viewSingleCat.css"; // external css file

export default function ViewCatDetail() {
  const { id } = useParams(); // get category id from route params
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Service.getSingleCategory(id) // API call to fetch category
      .then((res) => {
        console.log(res);
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.error("Error fetching category:", err);
        setError("❗ No category data found.");
      });
  }, [id]);

  return (
    <div className="main-card">
      <h2>🎨 Category Details</h2>

      {error ? (
        <div className="alert">{error}</div>
      ) : category ? (
        <>
          <div className="box blue-box">
            <div className="box-title">📌 Category Name</div>
            <div className="box-content">{category.category_name}</div>
          </div>

          <div className="box pink-box">
            <div className="box-title">📝 Category Description</div>
            <div className="box-content">{category.category_description}</div>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}

      <div className="button-group">
        <Link to="/view-category" className="btn btn-back">
          ⬅ Back to Categories
        </Link>

        {category && category.id && (
          <Link
            to={`/updateCategory/${category.id}`}
            className="btn btn-update"
          >
            ✏️ Update Category
          </Link>
        )}
      </div>
    </div>
  );
}
