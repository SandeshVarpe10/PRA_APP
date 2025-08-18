import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../service/service"; // <-- your axios service
import "../css/updateCat.css";

export default function UpdateCategory() {
  const { id } = useParams(); // category id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const [msg, setMsg] = useState("");

  // ✅ Fetch category details on load
  useEffect(() => {
    service.getCategoryById(id).then((res) => {
      if (res.data.success) {
        setFormData({
          categoryId: id,
          categoryName: res.data.category.category_name,
          categoryDescription: res.data.category.category_description,
        });
      } else {
        setMsg("Category not found!");
      }
    });
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    service.updateCategory(formData).then((res) => {
      if (res.data.success) {
        setMsg("Category updated successfully!");
        setTimeout(() => navigate("/view-category"), 800);
      } else {
        setMsg("Failed to update category!");
      }
    });
  };

  return (
    <div className="update-category-wrapper">
      <div className="card p-5 update-card">
        <h2 className="mb-5 text-center"> Update Category</h2>

        {msg && <div className="alert alert-info text-center mb-4">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label fw-bold">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categoryDescription" className="form-label fw-bold">
              Description
            </label>
            <textarea
              className="form-control"
              id="categoryDescription"
              name="categoryDescription"
              rows="3"
              value={formData.categoryDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button type="submit" className="btn btn-custom">
              📝 Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/adminDashboard")}
              className="btn btn-secondary"
            >
              ↩️ Back to Dashboard
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            className="btn btn-view"
            onClick={() => navigate("/view-category")}
          >
            📋 View Categories
          </button>
        </div>
      </div>
    </div>
  );
}
